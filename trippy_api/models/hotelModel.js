const mongoose = require("mongoose");

const HotelSchema = mongoose.Schema({
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
  hasSpa: {
    type: Boolean,
    required: true,
  },
  hasPool: {
    type: Boolean,
    required: true,
  },
  priceCategory: {
    type: Number,
    required: true,
  },
});

const Hotel = mongoose.model("Hotel", HotelSchema);

module.exports = Hotel;
