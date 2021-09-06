const restaurants = [
  {
    id: 1,
    name: "Les trois Mousquetaires",
    address: "22 av des Champs-Élysées",
    city: "Paris",
    country: "France",
    stars: 4,
    cuisine: "french",
    priceCategory: 3,
  },
  {
    id: 2,
    name: "The Fat Guy",
    address: "47 Jackson Boulevard",
    city: "New York",
    country: "US",
    stars: 5,
    cusine: "burger",
    priceCategory: 1,
  },
  {
    id: 3,
    name: "Veggies",
    address: "77 Avenir Street",
    city: "Sydnet",
    country: "Australia",
    stars: 5,
    cuisine: "vegan",
    priceCategory: 2,
  },
];

const getAllRestaurants = (_req, res) => {
  res.json({
    status: "OK",
    data: restaurants,
  });
};

const getRestaurantById = (req, res) => {
  const id = req.params.id;
  const restaurant = restaurants.filter((restaurant) => {
    return restaurant.id === parseInt(id);
  });
  res.json({
    status: "OK",
    data: restaurant,
  });
};

const newRestaurant = (req, res) => {
  const newRestaurant = req.body;
  restaurants.push(newRestaurant);

  res.json({
    status: "Restaurant successfully added",
    data: restaurants,
  });
};

const changeRestaurantName = (req, res) => {
  const id = req.params.id;
  const newName = req.query.name;
  const restaurant = restaurants.filter((restaurant) => {
    return restaurant.id === parseInt(id);
  });
  restaurant[0].name = newName;

  res.json({
    status: "Restaurant's name successfully updated",
    data: restaurant,
  });
};

const deleteRestaurant = (req, res) => {
  const id = req.params.id;
  const newRestaurants = restaurants.filter((restaurant) => {
    return restaurant.id !== parseInt(id);
  });

  res.json({
    status: "Restaurant has been successfully removed",
    data: newRestaurants,
  });
};

module.exports = {
  getAllRestaurants: getAllRestaurants,
  getRestaurantById: getRestaurantById,
  newRestaurant: newRestaurant,
  changeRestaurantName: changeRestaurantName,
  deleteRestaurant: deleteRestaurant,
};
