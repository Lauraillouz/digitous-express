const mongoose = require("mongoose");

const RestaurantSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  priceCategory: {
    type: Number,
    required: true,
  },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
