const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({
  path: "../config.env",
});

const newUser = async (req, res) => {
  const { firstName, surname, dateOfBirth, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    await User.create({
      firstName,
      surname,
      dateOfBirth,
      email,
      password: hashedPassword,
    });
    res.json({
      status: "OK",
      message: "New user created",
      data: {
        firstName,
        surname,
        dateOfBirth,
        email,
      },
    });
  } catch (err) {
    return res.status(400).json({
      message: "This user already exists",
    });
  }
};

const createToken = async (req, res) => {
  const { email, password } = req.body;

  // Does user exist
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message:
        "Something went wrong. Please enter a valid email/password or create an account",
    });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message:
        "Something went wrong. Please enter a valid email/password or create an account",
    });
  }

  // Go token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  // Go cookie
  res.cookie("jwt", token, { httpOnly: true, secure: false });

  res.json({
    message: "Cookie well deserved!",
  });
};

module.exports = { newUser, createToken };
