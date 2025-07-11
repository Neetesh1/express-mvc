//external modules
const express = require("express");

//local modules
const contactsController = require("../controllers/contacts");

const router = express.Router();

router.get("/", contactsController.getContactForm);

router.post("/", contactsController.postContactForm);



module.exports = router;