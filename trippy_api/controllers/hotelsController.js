const hotels = [
  {
    id: 1,
    name: "Imperial Hotel",
    address: "84 av des Champs-Élysées",
    city: "Paris",
    country: "France",
    stars: 5,
    hasSpa: true,
    hasPool: true,
    priceCategory: 3,
  },
  {
    id: 2,
    name: "The Queen",
    address: "3 Darwin Street",
    city: "London",
    country: "England",
    stars: 4,
    hasSpa: true,
    hasPool: false,
    priceCategory: 3,
  },
  {
    id: 3,
    name: "Kiwi land",
    address: "4587 George St.",
    city: "Auckland",
    country: "New-Zealand",
    stars: 3,
    hasSpa: false,
    hasPool: true,
    priceCategory: 2,
  },
];

//
// GET //
const getAllHotels = (_req, res) => {
  res.json({
    statuts: "OK",
    data: hotels,
  });
};

const getHotelById = (req, res) => {
  const id = req.params.id;
  const hotel = hotels.filter((hotel) => {
    return hotel.id === parseInt(id);
  });

  res.json({
    status: "OK",
    data: hotel,
  });
};

const getHotelByStarsAndCity = (req, res) => {
  const stars = req.query.stars;
  const city = req.query.city;
  console.log(stars);
  console.log(city);

  const filteredHotels = hotels.filter((hotel) => {
    return hotel.stars === parseInt(stars) && hotel.city.toLowerCase() === city;
  });

  if (filteredHotels.length > 0) {
    res.json({
      status: "Found at least a match",
      data: filteredHotels,
    });
  } else {
    res.json({
      status: "No match found",
    });
  }
};

//
// POST //
const newHotel = (req, res) => {
  const newHotel = req.body;
  hotels.push(newHotel);

  res.json({
    status: "New hotel successfully created",
    data: newHotel,
  });
};

//
// PUT //
const changeHotelName = (req, res) => {
  const id = req.params.id;
  const newName = req.query.name;

  const hotel = hotels.filter((hotel) => {
    return hotel.id === parseInt(id);
  });
  hotel[0].name = newName;
  res.json({
    status: "Hotel's name successfully updated",
    data: hotel,
  });
};

//
// DELETE //
const deleteHotel = (req, res) => {
  const id = req.params.id;
  const newHotels = hotels.filter((hotel) => {
    return hotel.id !== parseInt(id);
  });
  res.json({
    status: "Hotel has successfully been removed",
    data: newHotels,
  });
};

module.exports = {
  getAllHotels: getAllHotels,
  getHotelById: getHotelById,
  newHotel: newHotel,
  changeHotelName: changeHotelName,
  deleteHotel: deleteHotel,
  getHotelByStarsAndCity: getHotelByStarsAndCity,
};
