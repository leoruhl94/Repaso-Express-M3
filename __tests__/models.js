var model = require("../models/index");

describe("model", function () {
  // cada test comienza con la lista de contactos y grupos vacia y el prevId en 0
  beforeEach(function () {
    model.reset();
  });

  //__________________ section users_____________________

  describe("contactList y addContact", function () {
    it("Inicialmente, `contactList` devuelve un array de contactos vacío", function () {
      expect(model.contactList()).toEqual([]);
    });

    it("`addContact` debe agendar los contactos con nombre y telefono", function () {
      model.addContact("angelo", 1231231234);
      expect(model.contactList()).toHaveLength(1);
      model.addContact("antonella", 1112345678);
      expect(model.contactList()).toHaveLength(2);
      expect(model.contactList()[1].name).toEqual("antonella");
      expect(model.contactList()[1].telephone).toEqual(1112345678);
    });

    it("cada contacto debe tener inicialmente una propiedad `message` y debe ser un array vacio", function () {
      model.addContact("angelo", 1231231234);
      expect(model.contactList()[0].message).toEqual([]);
    });

    it("ademas debe tener una propiedad status con el valor `active` por defecto", function () {
      model.addContact("angelo", 1231231234);
      expect(model.contactList()[0].status).toEqual("active");
    });

    it("Si `addContact` recibe un numero que ya esta agendado retorna el contacto existente", function () {
      model.addContact("angelo", 1231231234);
      expect(model.addContact("antonella", 1231231234).name).toEqual("angelo");
      expect(model.contactList()[0].name).toEqual("angelo");
    });

    it("Si `contactList` recibe un status retorna la lista filtrada (active)", function () {
      model.addContact("alessia", 3514545454);
      model.addContact("barbara", 3544466777);
      model.addContact("gabriel", 3515666222);
      model.changeStatus(3544466777, "blocked");
      expect(model.contactList("active")).toHaveLength(2);
      expect(model.contactList("active")[1].name).toEqual("gabriel");
    });

    it("Si contactList recibe un status retorna la lista filtrada (blocked)", function () {
      model.addContact("alessia", 3514545454);
      model.addContact("barbara", 3544466777);
      model.addContact("gabriel", 3515666222);
      model.changeStatus(3544466777, "blocked");
      model.changeStatus(3514545454, "blocked");
      expect(model.contactList("blocked")).toHaveLength(2);
      expect(model.contactList("blocked")[1].status).toEqual("blocked");
    });
  });

  describe("`searchContact` y `changeStatus`", function () {
    it("changeStatus cambia el status de un contacto", function () {
      model.addContact("alessia", 3514545454);
      model.addContact("barbara", 3544466777);
      model.addContact("gabriel", 3515666222);
      model.changeStatus(3544466777, "blocked");
      model.changeStatus(3515666222, "blocked");
      expect(model.contactList()[0].status).toEqual("active");
      expect(model.contactList()[1].status).toEqual("blocked");
      expect(model.contactList()[2].status).toEqual("blocked");
      model.changeStatus(3515666222, "active");
      expect(model.contactList()[2].status).toEqual("active");
    });

    it("searchContact recibe un nombre devuelve una lista con todos los contactos que lo contengan", function () {
      model.addContact("alessia", 1231231234);
      model.addContact("angelo", 1231231235);
      model.addContact("gabriel", 1231231236);
      model.addContact("angelo", 1231231237);
      model.addContact("angelo", 1231231238);
      expect(model.searchContact("angelo")).toHaveLength(3);
      expect(model.searchContact("angelo")[2].telephone).toEqual(1231231238);
    });

    it("si searchContact recibe una fraccion del nombre devuelve una lista con todos los contactos que la incluyen", function () {
      model.addContact("alessia", 1231231234);
      model.addContact("amaranto", 1231231235);
      model.addContact("antonella", 1231231236);
      model.addContact("antony", 1231231237);
      model.addContact("gabriel", 1231231238);
      model.addContact("santos", 1231231227);
      model.addContact("angelo", 1231231278);
      expect(model.searchContact("anto")).toHaveLength(4);
      expect(model.searchContact("anto")[0].name).toEqual("amaranto");
      expect(model.searchContact("anto")[2].name).toEqual("antony");
    });

    it("searchContact encuentra el nombre sin importar si esta en mayusculas o minusculas", function () {
      model.addContact("Alessia", 1231231234);
      model.addContact("AmaRanTo", 1231231235);
      model.addContact("Antonella", 1231231236);
      model.addContact("anTOny", 1231231237);
      model.addContact("gabriel", 1231231238);
      model.addContact("Santos", 1231231227);
      model.addContact("angelo", 1231231278);
      expect(model.searchContact("Anto")).toHaveLength(4);
      expect(model.searchContact("AnTo")[0].name).toEqual("AmaRanTo");
      expect(model.searchContact("aNTo")[2].name).toEqual("anTOny");
    });

    it("si searchContact tambien un status devuelve solo los contactos que lo tengan", function () {
      model.addContact("alessia", 1231231234);
      model.addContact("amaranto", 1231231235);
      model.addContact("antonella", 1231231236);
      model.addContact("antony", 1231231237);
      model.addContact("gabriel", 1231231238);
      model.addContact("santos", 1231231227);
      model.addContact("angelo", 1231231278);
      model.changeStatus(1231231237, "blocked");
      model.changeStatus(1231231235, "blocked");
      expect(model.searchContact("anto", "blocked")).toHaveLength(2);
      expect(model.searchContact("anto", "active")).toHaveLength(2);
      expect(model.searchContact("anto", "blocked")[0].name).toEqual("amaranto");
      expect(model.searchContact("anto", "active")[1].name).toEqual("santos");
    });
  });

  describe("`deleteContact` y `editContact`", function () {
    it("deleteContact recibe un numero de telefono y elimina el contacto", function () {
      model.addContact("alessia", 3514545454);
      model.addContact("barbara", 3544466777);
      model.addContact("gabriel", 3515666222);
      expect(model.contactList()).toHaveLength(3);
      model.deleteContact(3544466777);
      expect(model.contactList()).toHaveLength(2);
      model.deleteContact(3515666222);
      expect(model.contactList()).toHaveLength(1);
      model.deleteContact(3514545454);
      expect(model.contactList()).toHaveLength(0);
    });

    it("deleteContact retorna el contacto que se va a eliminar", function () {
      model.addContact("alessia", 3514545454);
      model.addContact("barbara", 3544466777);
      model.addContact("gabriel", 3515666222);
      expect(model.deleteContact(3544466777).name).toEqual("barbara");
      expect(model.deleteContact(3514545454).name).toEqual("alessia");
      expect(model.deleteContact(3515666222).name).toEqual("gabriel");
    });

    it("si deleteContact no encuentra el contacto a borrar retorna false", function () {
      expect(model.deleteContact(3544466777)).toBe(false);
    });

    it("editContact si no recibe el numero o no existe el contacto retorna false", function () {
      expect(model.editContact({})).toBe(false);
      expect(model.editContact({ phone: 3515151511 })).toBe(false);
    });

    it("editContact debe retornar el usuario correctamente editado", function () {
      model.addContact("alessia", 1231231234);
      model.addContact("amaranto", 1231231235);
      model.addContact("antonella", 1231231236);
      expect(
        model.editContact({
          phone: 1231231235,
          name: "barbara",
          status: "blocked",
        })
      ).toEqual({
        message: [],
        name: "barbara",
        status: "blocked",
        telephone: 1231231235,
      });
      expect(model.contactList("active")[1].name).toEqual("antonella");
    });

    it("editContact solo modifica la propiedad que se le pasa", function () {
      model.addContact("alessia", 1231231234);
      model.addContact("amaranto", 1231231235);
      model.addContact("antonella", 1231231236);
      expect(
        model.editContact({ phone: 1231231234, name: "barbara" }).status
      ).toEqual("active");
      expect(
        model.editContact({ phone: 1231231236, status: "blocked" }).name
      ).toEqual("antonella");
      expect(model.contactList("blocked")[0].name).toEqual("antonella");
    });
  });

  //__________________ section groups_____________________

  describe("createGroupId y getGroupIdList", function () {
    it('debe crear un id con el formato "group_xx" donde "xx" es un numero ', function () {
      expect(model.createGroupId()).toEqual("group_0");
    });

    it("el id debe ser auto-incremental", function () {
      expect(model.createGroupId()).toEqual("group_0");
      expect(model.createGroupId()).toEqual("group_1");
      expect(model.createGroupId()).toEqual("group_2");
      expect(model.createGroupId()).toEqual("group_3");
    });
  });

  describe("groupList y addGroup", function () {
    it("`groupList` inicialmente retorna un objeto vacio ", function () {
      expect(model.groupList()).toEqual({});
      expect(model.groupList()).toBeInstanceOf(Object);
    });

    it("addGroup debe retornar el nuevo grupo y debe ser un objeto", function () {
      expect(model.addGroup("Grupo 1")).toBeInstanceOf(Object);
    });

    it('el objeto retornado por addGroup contener la propiedad "groupName" y debe ser un string', function () {
      expect(model.addGroup("Grupo 1")).toEqual(
        expect.objectContaining({ groupName: "Grupo 1" })
      );
    });

    it('el objeto retornado por addGroup contener la propiedad "contacts" y debe ser un array', function () {
      expect(model.addGroup("Grupo 1")).toEqual(
        expect.objectContaining({ contacts: [] })
      );
    });

    it('el objeto retornado por addGroup contener la propiedad "messages" y debe ser un array', function () {
      expect(model.addGroup("Grupo 1")).toEqual(
        expect.objectContaining({ messages: [] })
      );
    });

    it(`addGroup debe agregar a la lista de grupos el grupo creado como una propiedad.
         El nombre de la propiedad debe ser el id generado para ese grupo`, function () {
      model.addGroup("Grupo 1");
      model.addGroup("Grupo 2");
      model.addGroup("Grupo 3");
      expect(model.groupList()).toEqual(
        expect.objectContaining({
          group_0: expect.any(Object),
          group_1: expect.any(Object),
          group_2: expect.any(Object),
        })
      );
    });

    it('si groupList recibe "pluckname = true" retorna un array con solo la lista de nombres ', function () {
      model.addGroup("Grupo 1");
      model.addGroup("Grupo 2");
      model.addGroup("Grupo 3");
      expect(model.groupList(true)).toBeInstanceOf(Array);
      expect(model.groupList(true)).toEqual(["Grupo 1", "Grupo 2", "Grupo 3"]);
    });
  });

  describe("createGroupId y getGroupIdList", function () {
    it("getGroupIdList  retorna una lista con todos los ids de los grupos", function () {
      expect(model.createGroupId()).toEqual("group_0");
    });
  });
});
