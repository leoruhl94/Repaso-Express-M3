// declarar aqui groups, contacts, y prevId

let groups = {};
let contacts = [];
let prevId = 0;

//______________________________________________________
/*
elemplo  array contacts
[
  {
    name: "angelo",
    telephone: 1231231234,
    message: [{text: "message1", date: "15/10/2021 13:50"}, {text: "message2", date: "15/10/2021 14:50"}],
    status: "active"
  },
  {
    name: "antonella",
    telephone: 1112345678,
    message: [{text: "message1", date: "15/10/2021 13:51"}, {text: "message2", date: "15/10/2021 14:51"}],
    status: "active"
  }
]
*/

module.exports = {
  // esta funcion es para resetear los tests
  reset: function () {
    groups = {};
    contacts = [];
    prevId = 0;
  },

  // Desde aqui comienza tu trabajo

  //________________________Users_______________________

  //addContact va a agregar un nuevo contacto  a contacts
  //debe retornar el nuevo contacto o el existente en caso que ya este agendado
  //el numero de telefono actuara como un id por ende no puede repetirse

  addContact: function (name, telephone) {
    const found = contacts.find((item) => item.telephone === telephone);
    if (found) return found;
    else {
      const newContact = {
        name: name,
        telephone: telephone,
        message: [],
        status: "active",
      };
      contacts.push(newContact);
      return newContact;
    }
  },

  //retorna toda la lista de contactos de wpp 
  //Si se le pasa un Status (active o blocked) retorna la lista filtrada
  contactList: function (status) {
    if (!status) return contacts;
    let search = contacts.filter((item) => item.status === status);
    return search;
  },

  // Cambia el status de un contacto
  changeStatus: function (phone, status) {
    let contact = contacts.find((item) => item.telephone === phone);
    contact.status = status;
  },

  // buscar contactos por nombre y retorna los que coincidan
  // puede recibir status para refinar la busqueda
  searchContact: function (name, status) {
    return status
      ? contacts.filter(
          (item) =>
            item.name.toLowerCase().includes(name.toLowerCase()) &&
            item.status === status
        )
      : contacts.filter((item) =>
          item.name.toLowerCase().includes(name.toLowerCase())
        );
  },

  // Hacer Delete Contact
  // retorna el usuario eliminado
  deleteContact: function (phone) {
    const contact = contacts.find((item) => item?.telephone === phone);
    if (!contact) return false;
    contacts = contacts.filter((item) => item.telephone !== phone);
    return contact;
  },

  // recibe un ojeto con phone(requerido) y
  // puede recibir para editar name y status
  editContact: function (data) {
    const { phone, name, status } = data;
    const index = phone
      ? contacts.findIndex((item) => item.telephone === phone)
      : -1;
    if (index < 0) return false;
    if (name) contacts[index].name = name;
    if (status) contacts[index].status = status;
    return contacts[index];
  },

  //________________________Groups_______________________

  // genera un id unico e incremental que inicie en con el formato "group_1"
  createGroupId: function () {
    return `group_${prevId++}`;
  },

  // retorna una lista con todos los ids de groups
  getGroupIdList: function () {
    return Object.keys(groups);
  },

  //Si se le pasa pluckName = true nos devuelve un array con los nombres de los grupos
  //en caso contrario retorna devuelve todos los grupos
  groupList: function (pluckName) {
    if (pluckName) {
      let keys = Object.keys(groups);
      return keys.map((item) => groups[item].groupName);
    }

    return groups;
  },

  // esta funcion crea un nuevo grupo de wpp
  // recibe el nombre del grupo y un array de contactos que formaran parte del grupo
  // el array de contactos contendra los numeros de los integrantes del grupo
  // solo se agregaran los usuarios que ya esten agendados
  // debe usar la funcion addUserToGroup para validar que los usuarios existan y despues añadirlos
  // el grupo debe tener un id unico e incremental que inicie en con el formato "group_1"
  // usar la funcion createGroupId para generar un id

  addGroup: function (groupName, arrayUsers) {
    let id = this.createGroupId();
    groups[id] = {
      groupName: groupName,
      contacts: [],
      messages: [],
    };
    //arrayUsers?.map(item => addUserToGroup(groups[id], item)); //con este map paso cada numero a una funcion auxiliar
    return groups[id];
  },

  // recibe el id del grupo y un numero de un contacto
  // si el contacto esta en la agenda lo agrega al grupo sino lo descarta
  // retorna true si se agrego el contacto y false si no lo hizo
  addUserToGroup: function (groupId, user) {
    let myGroup = groups.find((item) => item.groupId === groupId);
    let found = contacts.find((item) => item.telephone === user);
    if (found) {
      myGroup.contacts.push(found);
      return true;
    }
    return false;
  },

  deletUserToGroup: function (group, user) {
    let myGroup = groups.find((item) => item.groupName === group);
    let members = myGroup.contacts.filter((item) => item.telephone !== user);
    myGroup.contacts = members;
  },

  //________________________Messages_____________________

  //Nos va a traer toda la lista de mensajes de wpp GET
  mesaggeList: function (telephone) {
    const telephoneMessage = contacts.find(
      (user) => user.telephone === parseInt(telephone)
    );
    if (telephoneMessage?.message.length) {
      return telephoneMessage.message;
    }
    return false;
  },

  //Nos va agregar un mensaje de wpp POST
  addMessage: function (telephone, message) {
    const userMessage = contacts.find((user) => user.telephone === telephone);
    console.log(userMessage);
    if (!userMessage) return "No existe el usuario";
    if (message.text && message.date && typeof message.text === "string") {
      userMessage?.message.push(message);
      return userMessage?.message;
    }
    return false;
  },

  //__________________________Fin________________________
};
