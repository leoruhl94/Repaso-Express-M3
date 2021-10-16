var supertest = require("supertest-as-promised")(require("../index"));
var model = require("../models/index");

const contactToSend = {
  angelo: { userName: "angelo", userTelephone: 1231231234 },
  alessia: { userName: "alessia", userTelephone: 3514545454 },
  gabriel: { userName: "gabriel", userTelephone: 3515666222 },
  antonella: { userName: "antonella", userTelephone: 1112345678 },
  barbara: { userName: "barbara", userTelephone: 3544466777 },
};
const contactToReceive = {
  angelo: {
    name: "angelo",
    telephone: 1231231234,
    message: [],
    status: "active",
  },
  alessia: {
    name: "alessia",
    telephone: 3514545454,
    message: [],
    status: "active",
  },
  gabriel: {
    name: "gabriel",
    telephone: 3515666222,
    message: [],
    status: "active",
  },
  antonella: {
    name: "antonella",
    telephone: 1112345678,
    message: [],
    status: "active",
  },
  barbara: {
    name: "barbara",
    telephone: 3544466777,
    message: [],
    status: "blocked",
  },
};

describe("Routes", function () {
  beforeEach(function () {
    model.reset();
  });

  describe("/contacts", function () {
    xit("GET responde con un array vacío de entrada", function () {
      return supertest
        .get("/contacts")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).toEqual([]);
        });
    });

    xit("GET responde con un array con los contactos agregados", function () {
      model.addContact("alessia", 3514545454);
      model.addContact("angelo", 1231231234);
      model.addContact("gabriel", 3515666222);
      return supertest
        .get("/contacts")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(model.contactList()).toHaveLength(3);
          expect(res.body).toEqual([
            contactToReceive.alessia,
            contactToReceive.angelo,
            contactToReceive.gabriel,
          ]);
        });
    });

    xit("GET puede recibir un status", function () {
      model.addContact("alessia", 3514545454);
      model.addContact("angelo", 1231231234);
      model.addContact("gabriel", 3515666222);
      model.changeStatus(1231231234, "blocked");
      return supertest
        .get("/contacts?status=active")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(model.contactList("active")).toHaveLength(2);
          expect(res.body).toEqual([
            contactToReceive.alessia,
            contactToReceive.gabriel,
          ]);
        });
    });

    xit("GET puede recibir un status", function () {
      model.addContact("alessia", 3514545454);
      model.addContact("barbara", 3544466777);
      model.addContact("gabriel", 3515666222);
      model.changeStatus(3544466777, "blocked");
      return supertest
        .get("/contacts?status=blocked")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(model.contactList("blocked")).toHaveLength(1);
          expect(res.body).toEqual([contactToReceive.barbara]);
        });
    });
  });

  describe("/contact", function () {
    xit("POST agrega un nuevo contacto y devuelve el contacto agregado", function () {
      return supertest
        .post("/contact")
        .send(contactToSend.alessia)
        .expect(201)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).toEqual(contactToReceive.alessia);
        });
    });

    xit("POST devuelve un mensaje de error si no recibe nombre y telefono valido", function () {
      return supertest
        .post("/contact")
        .send({ userName: undefined })
        .expect(400)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).toEqual({
            message: "nombre y telefono son requeridos",
          });
        });
    });

    xit("POST devuelve un mensaje de error si el nombre no es tipo string", function () {
      return supertest
        .post("/contact")
        .send({ userName: true, userTelephone: 3513513512 })
        .expect(400)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).toEqual({
            message: "El nombre debe ser de tipo string",
          });
        });
    });

    xit("POST devuelve un mensaje de error si el telefono no es tipo number", function () {
      return supertest
        .post("/contact")
        .send({ userName: "badPhone", userTelephone: "3513513512" })
        .expect(400)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).toEqual({
            message:
              "El telefono debe tener al menos un numero y der de tipo number",
          });
        });
    });
  });

  describe("/groups", function () {
    xit("GET responde con un objeto vacío de entrada", function () {
      return supertest
        .get("/groups")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).toEqual({});
        });
    });
  });
});
