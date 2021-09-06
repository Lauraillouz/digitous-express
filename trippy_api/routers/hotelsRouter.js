const express = require("express");
const router = express.Router();

// Controllers
const hotelsControllers = require("../controllers/hotelsController");

// GET
router.get("/", hotelsControllers.getAllHotels);
router.get("/:id", hotelsControllers.getHotelById);

module.exports = router;
