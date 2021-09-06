const express = require("express");
const router = express.Router();
// Libraries
const expressValidator = require("express-validator");
// Controllers
const hotelsControllers = require("../controllers/hotelsController");

// GET
router.get("/", hotelsControllers.getHotels);
router.get("/stars", hotelsControllers.getHotelByStars);
router.get("/:id", hotelsControllers.getHotelById);

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
  expressValidator.body("hasSpa").isBoolean().withMessage("Must be a boolean"),
  expressValidator.body("hasPool").isBoolean().withMessage("Must be a boolean"),
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
  hotelsControllers.newHotel
);

// PUT
router.put("/:id", hotelsControllers.changeHotelName);

// DELETE
router.delete("/:id", hotelsControllers.deleteHotel);

module.exports = router;
