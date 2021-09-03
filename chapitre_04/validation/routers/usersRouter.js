const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();

// GET
router.get("/", usersController.getAllUsers);
router.get("/:username", usersController.getOneUser);

// POST
router.post("/", usersController.newUser);

module.exports = router;
