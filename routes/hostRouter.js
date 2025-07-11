//external modules
const express = require("express");

//local modules
const homesController = require("../controllers/homes");

const router = express.Router();

router.get("/add-home", homesController.getAddHome);

router.post("/add-home", homesController.postHOme);

router.get("/edit-home/:id", homesController.getEditHome);

router.post("/edit-home/:id", homesController.postEditHome);

module.exports = router;
