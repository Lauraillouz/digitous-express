const express = require("express");
const router = express.Router();

// Controllers
const restaurantsController = require("../controllers/restaurantsController");

// GET
router.get("/", restaurantsController.getRestaurants);
router.get("/:id", restaurantsController.getRestaurantById);

// POST
router.post("/", restaurantsController.newRestaurant);

// PUT
router.put("/:id", restaurantsController.changeRestaurantName);

// DELETE
router.delete("/:id", restaurantsController.deleteRestaurant);

module.exports = router;
