const users = [
  {
    username: "Bla",
    email: "bla@test.com",
    age: 80,
    city: "Bla",
  },
  {
    username: "Bli",
    email: "bli@test.com",
    age: 88,
    city: "Bli",
  },
  {
    username: "Blou",
    email: "blou@test.com",
    age: 88,
    city: "Blou",
  },
];

const getAllUsers = (_req, res) => {
  res.json({
    status: "OK",
    data: users,
  });
};

const getOneUser = (req, res) => {
  const userName = req.params.username;
  const user = users.find((user) => {
    return user.username.toLowerCase() === userName.toLowerCase();
  });
  console.log(user);
  res.json({
    status: "OK",
    data: user,
  });
};

const newUser = (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json({
    status: "OK",
    newUser: newUser,
    data: users,
  });
};

module.exports = {
  getAllUsers: getAllUsers,
  getOneUser: getOneUser,
  newUser: newUser,
};
