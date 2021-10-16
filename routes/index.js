// importar models
const {
  contactList,
  addContact,
  groupList,
  addGroup,
  messageList,
  addMessage,
  searchContact,
} = require("../models/index");

const express = require("express");
const router = express.Router();

//_________________Users___________________

//imprime toda la lista por defecto y puede recibir status por query
router.get("/contacts", (req, res) => {
  res.json()//esta linea es para que no se cuelguen los tests, reemplazala por tu codigo

});

//recibe name por params y retorna la lista con los nombres que coincidan
router.get("/contacts/:name", (req, res) => {

});

// name y telephone son obligatorios
router.post("/contact", (req, res) => {
  res.json()//esta linea es para que no se cuelguen los tests, reemplazala por tu codigo

});

//_________________Groups__________________

router.get("/groups", (req, res) => {
  res.json()//esta linea es para que no se cuelguen los tests, reemplazala por tu codigo

});

router.post("/group", (req, res) => {
  res.json()//esta linea es para que no se cuelguen los tests, reemplazala por tu codigo
 
});

//_________________Messages_________________

router.get("/messages/:tel", (req, res) => {
  res.json()//esta linea es para que no se cuelguen los tests, reemplazala por tu codigo
 
});

router.post("/message", (req, res) => {
  res.json()//esta linea es para que no se cuelguen los tests, reemplazala por tu codigo
  

});

//___________________Fin___________________

module.exports = router;
