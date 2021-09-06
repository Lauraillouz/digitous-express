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

const newHotel = (req, res) => {
  const newHotel = req.body;
  hotels.push(newHotel);

  res.json({
    status: "New hotel successfully created",
    data: newHotel,
  });
};

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

module.exports = {
  getAllHotels: getAllHotels,
  getHotelById: getHotelById,
  newHotel: newHotel,
  changeHotelName: changeHotelName,
};
