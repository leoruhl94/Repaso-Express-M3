var model = require("../models/index");

describe("model", function () {
  // cada test comienza con la lista de contactos y grupos vacia y el prevId en 0
  beforeEach(function () {
    model.reset();
  });

  //__________________ section users_____________________

  describe("contactList y addUser", function () {
    it("Inicialmente, `contactList` devuelve un array de contactos vacío", function () {
      expect(model.contactList()).toEqual([]);
    });

    it("`addUser` debe agendar los contactos con nombre y telefono", function () {
      model.addUser("angelo", 1231231234);
      expect(model.contactList()).toHaveLength(1);
      model.addUser("antonella", 1112345678);
      expect(model.contactList()).toHaveLength(2);
      expect(model.contactList()[1].name).toEqual("antonella");
      expect(model.contactList()[1].telephone).toEqual(1112345678);
    });

    it("cada contacto debe tener inicialmente una propiedad `message` y debe ser un array vacio", function () {
      model.addUser("angelo", 1231231234);
      expect(model.contactList()[0].message).toEqual([]);
    });

    it("ademas debe tener una propiedad status con el valor `active` por defecto", function () {
      model.addUser("angelo", 1231231234);
      expect(model.contactList()[0].status).toEqual("active");
    });

    it("Si `addUser` recibe un numero que ya esta agendado retorna el contacto existente", function () {
      model.addUser("angelo", 1231231234);
      expect(model.addUser("antonella", 1231231234).name).toEqual("angelo");
      expect(model.contactList()[0].name).toEqual("angelo");
    });

    it("Si `contactList` recibe un status retorna la lista filtrada (active)", function () {
      model.addUser("alessia", 3514545454);
      model.addUser("barbara", 3544466777);
      model.addUser("gabriel", 3515666222);
      model.changeStatus(3544466777, "blocked");
      expect(model.contactList("active")).toHaveLength(2);
      expect(model.contactList("active")[1].name).toEqual("gabriel");
    });

    it("Si contactList recibe un status retorna la lista filtrada (blocked)", function () {
      model.addUser("alessia", 3514545454);
      model.addUser("barbara", 3544466777);
      model.addUser("gabriel", 3515666222);
      model.changeStatus(3544466777, "blocked");
      model.changeStatus(3514545454, "blocked");
      expect(model.contactList("blocked")).toHaveLength(2);
      expect(model.contactList("blocked")[1].status).toEqual("blocked");
    });
  });

  describe("`searchUser` y `changeStatus`", function () {
    it("changeStatus cambia el status de un contacto", function () {
      model.addUser("alessia", 3514545454);
      model.addUser("barbara", 3544466777);
      model.addUser("gabriel", 3515666222);
      model.changeStatus(3544466777, "blocked");
      model.changeStatus(3515666222, "blocked");
      expect(model.contactList()[0].status).toEqual("active");
      expect(model.contactList()[1].status).toEqual("blocked");
      expect(model.contactList()[2].status).toEqual("blocked");
      model.changeStatus(3515666222, "active");
      expect(model.contactList()[2].status).toEqual("active");
    });

    it("searchUser recibe un nombre devuelve una lista con todos los contactos que lo contengan", function () {
      model.addUser("alessia", 1231231234);
      model.addUser("angelo", 1231231235);
      model.addUser("gabriel", 1231231236);
      model.addUser("angelo", 1231231237);
      model.addUser("angelo", 1231231238);
      expect(model.searchUser("angelo")).toHaveLength(3);
      expect(model.searchUser("angelo")[2].telephone).toEqual(1231231238);
    });

    it("si searchUser recibe una fraccion del nombre devuelve una lista con todos los contactos que la incluyen", function () {
      model.addUser("alessia", 1231231234);
      model.addUser("amaranto", 1231231235);
      model.addUser("antonella", 1231231236);
      model.addUser("antony", 1231231237);
      model.addUser("gabriel", 1231231238);
      model.addUser("santos", 1231231227);
      model.addUser("angelo", 1231231278);
      expect(model.searchUser("anto")).toHaveLength(4);
      expect(model.searchUser("anto")[0].name).toEqual("amaranto");
      expect(model.searchUser("anto")[2].name).toEqual("antony");
    });

    it("searchUser encuentra el nombre sin importar si esta en mayusculas o minusculas", function () {
      model.addUser("Alessia", 1231231234);
      model.addUser("AmaRanTo", 1231231235);
      model.addUser("Antonella", 1231231236);
      model.addUser("anTOny", 1231231237);
      model.addUser("gabriel", 1231231238);
      model.addUser("Santos", 1231231227);
      model.addUser("angelo", 1231231278);
      expect(model.searchUser("Anto")).toHaveLength(4);
      expect(model.searchUser("AnTo")[0].name).toEqual("AmaRanTo");
      expect(model.searchUser("aNTo")[2].name).toEqual("anTOny");
    });

    it("si searchUser tambien un status devuelve solo los contactos que lo tengan", function () {
      model.addUser("alessia", 1231231234);
      model.addUser("amaranto", 1231231235);
      model.addUser("antonella", 1231231236);
      model.addUser("antony", 1231231237);
      model.addUser("gabriel", 1231231238);
      model.addUser("santos", 1231231227);
      model.addUser("angelo", 1231231278);
      model.changeStatus(1231231237, "blocked");
      model.changeStatus(1231231235, "blocked");
      expect(model.searchUser("anto", "blocked")).toHaveLength(2);
      expect(model.searchUser("anto", "active")).toHaveLength(2);
      expect(model.searchUser("anto", "blocked")[0].name).toEqual("amaranto");
      expect(model.searchUser("anto", "active")[1].name).toEqual("santos");
    });
  });

  describe("`deleteUser` y `editUser`", function () {
    it("deleteUser recibe un numero de telefono y elimina el contacto", function () {
      model.addUser("alessia", 3514545454);
      model.addUser("barbara", 3544466777);
      model.addUser("gabriel", 3515666222);
      expect(model.contactList()).toHaveLength(3);
      model.deleteUser(3544466777);
      expect(model.contactList()).toHaveLength(2);
      model.deleteUser(3515666222);
      expect(model.contactList()).toHaveLength(1);
      model.deleteUser(3514545454);
      expect(model.contactList()).toHaveLength(0);
    });

    it("deleteUser retorna el contacto que se va a eliminar", function () {
      model.addUser("alessia", 3514545454);
      model.addUser("barbara", 3544466777);
      model.addUser("gabriel", 3515666222);
      expect(model.deleteUser(3544466777).name).toEqual("barbara");
      expect(model.deleteUser(3514545454).name).toEqual("alessia");
      expect(model.deleteUser(3515666222).name).toEqual("gabriel");
    });

    it("si deleteUser no encuentra el contacto a borrar retorna false", function () {
      expect(model.deleteUser(3544466777)).toBe(false);
    });

    it("editUser si no recibe el numero o no existe el contacto retorna false", function () {
      expect(model.editUser({})).toBe(false);
      expect(model.editUser({ phone: 3515151511 })).toBe(false);
    });

    it("editUser debe retornar el usuario correctamente editado", function () {
      model.addUser("alessia", 1231231234);
      model.addUser("amaranto", 1231231235);
      model.addUser("antonella", 1231231236);
      expect(
        model.editUser({
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

    it("editUser solo modifica la propiedad que se le pasa", function () {
      model.addUser("alessia", 1231231234);
      model.addUser("amaranto", 1231231235);
      model.addUser("antonella", 1231231236);
      expect(
        model.editUser({ phone: 1231231234, name: "barbara" }).status
      ).toEqual("active");
      expect(
        model.editUser({ phone: 1231231236, status: "blocked" }).name
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
