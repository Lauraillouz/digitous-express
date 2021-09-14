const express = require("express");
const router = express.Router();

// Middlewares

// Controller
const userController = require("../controllers/userController");

// POST
router.post("/", userController.newUser);

module.exports = router;
