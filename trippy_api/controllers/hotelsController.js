const mongoose = require("mongoose");
const Hotel = require("../models/hotelModel");

//
// GET //
const getHotels = async (req, res) => {
  const stars = parseInt(req.query.stars);
  const city = req.query.city;

  if (stars && city) {
    const filteredHotels = await Hotel.find({
      stars,
      city: new RegExp(city, "i"),
    });
    return res.json({
      status: "Found matching data",
      data: filteredHotels,
    });
  } else {
    const hotels = await Hotel.find();
    res.json({
      statuts: "OK",
      data: hotels,
    });
  }
};

const getHotelById = async (req, res) => {
  const id = req.params.id;
  const hotel = await Hotel.findOne({ _id: id });

  if (hotel) {
    res.json({
      status: "OK",
      data: hotel,
    });
  } else {
    res.json({
      status: "error",
      message: "This ID does not exist",
    });
  }
};

const getHotelByStars = async (req, res) => {
  const orderSort = req.query.sort;

  // Sort hotels by stars
  if (orderSort === "DSC") {
    const hotels = await Hotel.find();
    hotels.sort((a, b) => b.stars - a.stars);
    res.json({
      status: "Hotels successfully sorted",
      data: hotels,
    });
  }
};

//
// POST //
const newHotel = async (req, res) => {
  const newHotel = req.body;

  const hotels = await Hotel.create(newHotel);

  res.json({
    status: "New hotel successfully created",
    data: hotels,
  });
};

//
// PUT //
const changeHotelName = async (req, res) => {
  const id = parseInt(req.params.id);
  const newName = req.query.name;

  const hotel = await Hotel.updateOne({ id: id }, { name: newName });

  if (hotel) {
    const updatedHotel = await Hotel.findOne({ id: id });
    res.json({
      status: "Hotel's name successfully updated",
      data: updatedHotel,
    });
  } else {
    res.json({
      status: "Something went wrong",
    });
  }
};

//
// DELETE //
const deleteHotel = async (req, res) => {
  const id = parseInt(req.params.id);

  const hotel = await Hotel.deleteOne({ id: id });

  if (hotel) {
    const newHotels = await Hotel.find();
    res.json({
      status: "Hotel has successfully been removed",
      data: newHotels,
    });
  } else {
    res.json({
      status: "Something went wrong",
    });
  }
};

module.exports = {
  getHotels: getHotels,
  getHotelById: getHotelById,
  newHotel: newHotel,
  changeHotelName: changeHotelName,
  deleteHotel: deleteHotel,
  getHotelByStars: getHotelByStars,
};
