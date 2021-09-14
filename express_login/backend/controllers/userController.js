const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

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

module.exports = { newUser };
