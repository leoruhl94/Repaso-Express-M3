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

  },

  //retorna toda la lista de contactos de wpp 
  //Si se le pasa un Status (active o blocked) retorna la lista filtrada
  contactList: function (status) {

  },

  // Cambia el status de un contacto
  changeStatus: function (phone, status) {

  },

  // buscar contactos por nombre y retorna los que coincidan
  // puede recibir status para refinar la busqueda
  searchContact: function (name, status) {

  },

  // Hacer Delete Contact
  // retorna el usuario eliminado
  deleteContact: function (phone) {

  },

  // recibe un ojeto con phone(requerido) y
  // puede recibir para editar name y status
  editContact: function (data) {

  },

  //________________________Groups_______________________

  // genera un id unico e incremental que inicie en con el formato "group_1"
  createGroupId: function () {

  },

  // retorna una lista con todos los ids de groups
  getGroupIdList: function () {

  },

  //Si se le pasa pluckName = true nos devuelve un array con los nombres de los grupos
  //en caso contrario retorna devuelve todos los grupos
  groupList: function (pluckName) {
 
  },

  // esta funcion crea un nuevo grupo de wpp
  // recibe el nombre del grupo y un array de contactos que formaran parte del grupo
  // el array de contactos contendra los numeros de los integrantes del grupo
  // solo se agregaran los usuarios que ya esten agendados
  // debe usar la funcion addUserToGroup para validar que los usuarios existan y despues añadirlos
  // el grupo debe tener un id unico e incremental que inicie en con el formato "group_1"
  // usar la funcion createGroupId para generar un id

  addGroup: function (groupName, arrayUsers) {

  },

  // recibe el id del grupo y un numero de un contacto
  // si el contacto esta en la agenda lo agrega al grupo sino lo descarta
  // retorna true si se agrego el contacto y false si no lo hizo
  addUserToGroup: function (groupId, user) {

  },

  deletUserToGroup: function (group, user) {

  },

  //________________________Messages_____________________

  //Nos va a traer toda la lista de mensajes de wpp GET
  mesaggeList: function (telephone) {

  },

  //Nos va agregar un mensaje de wpp POST
  addMessage: function (telephone, message) {

  },

  //__________________________Fin________________________
};
