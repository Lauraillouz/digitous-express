const mongoose = require("mongoose");
const User = require("../models/userModel");

const getAllUsers = async (_req, res) => {
  const users = await User.find();
  res.json({
    status: "OK",
    data: users,
  });
};

const getOneUser = async (req, res) => {
  const userName = req.params.username.toLowerCase();
  console.log(userName);

  const user = await User.findOne({ username: userName });
  console.log(user);
  if (user) {
    return res.json({
      status: "OK",
      data: user,
    });
  } else {
    res.json({
      status: "error",
      message: "user not found",
    });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ _id: id });

  if (user) {
    return res.json({
      status: "OK",
      data: user,
    });
  } else {
    res.json({
      status: "error",
      message: "user not found",
    });
  }
};

const getUserByEmail = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email: email });
  if (user) {
    res.json({
      status: "OK",
      data: user,
    });
  } else {
    res.json({
      status: "error",
      message: "user not found",
    });
  }
};

const newUser = async (req, res) => {
  await User.create(req.body);
  res.json({
    status: "OK",
    message: "New user created",
  });
};

module.exports = {
  getAllUsers: getAllUsers,
  getOneUser: getOneUser,
  getUserById: getUserById,
  getUserByEmail: getUserByEmail,
  newUser: newUser,
};
