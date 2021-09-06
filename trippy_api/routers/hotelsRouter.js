const express = require("express");
const router = express.Router();

// Controllers
const hotelsControllers = require("../controllers/hotelsController");

// GET
router.get("/", hotelsControllers.getAllHotels);
router.get("/:id", hotelsControllers.getHotelById);

// POST
router.post("/", hotelsControllers.newHotel);

// PUT
router.put("/:id", hotelsControllers.changeHotelName);

module.exports = router;
