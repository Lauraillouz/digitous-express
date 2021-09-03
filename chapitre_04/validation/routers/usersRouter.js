const express = require("express");
const { sanitizeBody } = require("express-validator");
const router = express.Router();
// Libraries
const expressValidator = require("express-validator");
// Controllers
const usersController = require("../controllers/usersController");

// GET
router.get("/", usersController.getAllUsers);
router.get("/:username", usersController.getOneUser);
router.get("/id/:id", usersController.getUserById);
router.get("/email/:email", usersController.getUserByEmail);

// POST
router.post(
  "/",
  expressValidator.body("email").isEmail(),
  expressValidator
    .body("username")
    .trim()
    .custom((value) => {
      const schema = value.length > 4;
      return schema;
    }),
  expressValidator.body("age").custom((value) => {
    const schema = value >= 10 && typeof value === "number";
    return schema;
  }),
  expressValidator
    .body("city")
    .trim()
    .not()
    .isEmpty()
    .custom((value) => {
      const schema = typeof value === "string";
      return schema;
    }),
  (req, res) => {
    const errors = expressValidator.validationResult(req);

    if (errors.isEmpty()) {
      const newUser = req.body;
      res.json({
        status: "OK",
        newUser: newUser,
      });
    } else {
      console.log(errors);
      res.json({
        status: "error",
        message: "Form is incorrect",
      });
    }
  },
  sanitizeBody("email").normalizeEmail(),
  sanitizeBody("username").escape(),
  sanitizeBody("age").escape(),
  sanitizeBody("city").escape(),
  usersController.newUser
);

module.exports = router;
