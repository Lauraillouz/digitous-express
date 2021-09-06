const express = require("express");
const router = express.Router();
// Libraries
const expressValidator = require("express-validator");
// Controllers
const restaurantsController = require("../controllers/restaurantsController");

// GET
router.get("/", restaurantsController.getRestaurants);
router.get("/:id", restaurantsController.getRestaurantById);

// POST
router.post(
  "/",
  expressValidator.body("name").isString().withMessage("Must be a string"),
  expressValidator.body("address").isString().withMessage("Must be a string"),
  expressValidator.body("city").isString().withMessage("Must be a string"),
  expressValidator.body("country").isString().withMessage("Must be a string"),
  expressValidator
    .body("stars")
    .isInt({ min: 1, max: 5 })
    .withMessage("Must be a number between 1 and 5"),
  expressValidator.body("cuisine").isString().withMessage("Must be a string"),
  expressValidator
    .body("priceCategory")
    .isInt({ min: 1, max: 3 })
    .withMessage("Must be a number between 1 and 3"),
  (req, res) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        status: "Error",
        message: errors,
      });
    }
  },
  restaurantsController.newRestaurant
);

// PUT
router.put("/:id", restaurantsController.changeRestaurantName);

// DELETE
router.delete("/:id", restaurantsController.deleteRestaurant);

module.exports = router;
