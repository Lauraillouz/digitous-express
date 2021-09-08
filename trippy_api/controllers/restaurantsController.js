const Restaurant = require("../models/restaurantModel");

//
// GET //
const getRestaurants = async (req, res) => {
  const cuisine = req.query.cuisine;
  const city = req.query.city;
  const limit = parseInt(req.query.limit);
  const stars = parseInt(req.query.stars);

  // Get restaurants by cuisine & city
  /*   let filteredRestaurants = restaurants.filter((restaurant) => {
    return (
      restaurant.cuisine === cuisine &&
      restaurant.city.replace(" ", "").toLowerCase() === city
    );
  }); */

  // Get restaurants by stars and limited number
  /* let limitedRestaurants = restaurants.filter((restaurant) => {
    return restaurant.stars === parseInt(stars);
  });
  limitedRestaurants = limitedRestaurants.splice(0, limit); */

  // Return
  if (cuisine && city) {
    const filteredRestaurants = await Restaurant.find({
      cuisine: new RegExp(cuisine, "i"),
      city: new RegExp(city, "i"),
    });
    return res.json({
      status: "Found matching data",
      data: filteredRestaurants,
    });
  } else if (limit) {
    let limitedRestaurants = await Restaurant.find({ stars }).limit(limit);
    return res.json({
      status: "Limited results received",
      data: limitedRestaurants,
    });
  } else {
    const restaurants = await Restaurant.find();
    res.json({
      status: "OK",
      data: restaurants,
    });
  }
};

const getRestaurantById = async (req, res) => {
  const id = parseInt(req.params.id);
  const restaurant = await Restaurant.findOne({ id: id });
  if (restaurant) {
    res.json({
      status: "OK",
      data: restaurant,
    });
  } else {
    res.json({
      status: "Error",
      message: "This ID does not exist",
    });
  }
};

//
// POST //
const newRestaurant = async (req, res) => {
  const newRestaurant = req.body;

  const restaurantAdded = await Restaurant.create(newRestaurant);

  if (restaurantAdded) {
    const restaurants = await Restaurant.find();
    res.json({
      status: "Restaurant successfully added",
      data: restaurants,
    });
  } else {
    res.json({
      status: "error",
      message: "No restaurant found",
    });
  }
};

//
// PUT //
const changeRestaurantName = async (req, res) => {
  const id = parseInt(req.params.id);
  const queries = req.query;

  const queriesKeys = Object.keys(queries);

  const restaurant = await Restaurant.findOne({ id: id });

  if (restaurant) {
    queriesKeys.map(async (value) => {
      const updatedRestaurant = await Restaurant.updateOne(
        { id: id },
        { [value]: queries[value] }
      );
      return updatedRestaurant;
    });
    const restaurant = await Restaurant.findOne({ id: id });
    res.json({
      status: "Restaurant's name successfully updated",
      data: restaurant,
    });
  } else {
    res.json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

//
// DELETE //
const deleteRestaurant = async (req, res) => {
  const id = parseInt(req.params.id);

  const restaurant = await Restaurant.findOne({ id: id });

  if (restaurant) {
    await Restaurant.deleteOne({ id: id });
    const newRestaurants = await Restaurant.find();
    res.json({
      status: "Restaurant has been successfully removed",
      data: newRestaurants,
    });
  } else {
    res.json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getRestaurants: getRestaurants,
  getRestaurantById: getRestaurantById,
  newRestaurant: newRestaurant,
  changeRestaurantName: changeRestaurantName,
  deleteRestaurant: deleteRestaurant,
};
