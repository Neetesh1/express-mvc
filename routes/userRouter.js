//external modules
const express = require("express");

//local modules
const homesController = require("../controllers/homes");

const router = express.Router();

router.get("/", homesController.getHomes);

module.exports = router;