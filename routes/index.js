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
  const { status } = req.query;
  if (status) return res.json(contactList(status));
  return res.json(contactList());
});

//recibe name por params y retorna la lista con los nombres que coincidan
router.get("/contacts/:name", (req, res) => {
  const { name } = req.params;
  return res.json(searchUser(name));
});

// name y telephone son obligatorios
router.post("/contact", (req, res) => {
  const { contactName, telephone } = req.body;
  if (!telephone || !contactName) {
    return res
      .status(400)
      .json({ message: "nombre y telefono son requeridos" });
  }
  if (typeof contactName !== "string") {
    return res
      .status(400)
      .json({ message: "El nombre debe ser de tipo string" });
  }
  if (typeof telephone !== "number") {
    return res
      .status(400)
      .json({
        message:
          "El telefono debe tener al menos un numero y der de tipo number",
      });
  }
  const newContact = addContact(contactName, telephone);
  return res.status(201).json(newContact);
});

//_________________Groups__________________

router.get("/groups", (req, res) => {
  return res.json(groupList());
});

router.post("/group", (req, res) => {
  const { groupName, usersName } = req.body;
  const grupos = addGroup(groupName, usersName);
  return res.json(grupos);
});

//_________________Messages_________________

router.get("/messages/:tel", (req, res) => {
  const { tel } = req.params;
  const telMessage = messageList(tel);
  if (telMessage) return res.json(telMessage);
  return res.json({ message: "No hay mensajes" }).status(404);
});

router.post("/message", (req, res) => {
  const { telephone, message } = req.body;
  const newMessage = addMessage(telephone, message);
  if (newMessage === "No existe el usuario")
    return res.json({ message: "El usuario no existe" }).status(404);
  if (newMessage) return res.json(newMessage);
  return res.json({ message: "El mensaje es incorrecto" }).status(400);
});

//___________________Fin___________________

module.exports = router;
