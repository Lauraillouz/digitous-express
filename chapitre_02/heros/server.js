const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongDB");
  });
const app = express();

// Port

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

// Schéma
const SuperheroSchema = new mongoose.Schema({
  name: String,
  power: Array,
  color: String,
  isAlive: Boolean,
  age: Number,
  image: String,
});
// Modèle
const Superhero = mongoose.model("Superhero", SuperheroSchema);

const debug = (_req, _res, next) => {
  const auth = true;
  if (auth) {
    console.log("Server has been sollicitated");
    next();
  } else {
    console.log("Server has not been sollicitated");
  }
  next();
};
// Middleware global
app.use((_req, _res, next) => {
  next();
});
// Middleware to Lowercase
const transformName = (req, _res, next) => {
  req.body.name = req.body.name.toLowerCase();
  next();
};
// Middleware to check if hero already exists before add
/* const checkHeroAdd = (req, res, next) => {
  const newHero = req.body;
  superHeroes.map((hero) => {
    if (hero.name.toLowerCase().replace(" ", "") === newHero.name) {
      return res.json({
        message: "Ce héros existe déjà !",
      });
    } else {
      return next();
    }
  });
};
// Middleware to check if hero already exists before delete
const checkHeroRemove = (req, res, next) => {
  const heroToRemove = req.params;
  for (let i = 0; i < superHeroes.length; i++) {
    if (
      superHeroes[i].name.toLowerCase().replace(" ", "") === heroToRemove.name
    ) {
      return next();
    } else {
      return res.json({
        message: "Ce héros n'existe pas !",
      });
    }
  }
}; */

// ROUTES
//Global
app.get(
  "/",
  /* debug, */ (_req, res) => {
    res.json({
      message: "OK",
    });
  }
);

// All heroes
app.get("/heroes", async (_req, res) => {
  const superheroes = await Superhero.find();
  res.json({
    status: "OK",
    data: superheroes,
  });
});
// Add Hero
app.post(
  "/heroes",
  /* transformName, checkHeroAdd, */ async (req, res) => {
    await Superhero.create(req.body);
    res.json({
      message: "Ok, héros ajouté",
    });
  }
);

// Hero by name
app.get("/heroes/:name", async (req, res) => {
  const superheroes = await Superhero.find();
  const superhero = await superheroes.filter((superhero) => {
    return superhero.name.toLowerCase().replace(" ", "") === req.params.name;
  });
  res.json({
    status: "OK",
    data: superhero,
  });
});
// Delete Hero
app.delete(
  "/heroes/:name",
  /* checkHeroRemove, */ async (req, res) => {
    const paramsName = req.params.name;
    const superheroName =
      paramsName.charAt(0).toUpperCase() + paramsName.slice(1);
    console.log(superheroName);
    await Superhero.deleteOne({ name: superheroName });
    res.json({
      message: `${superheroName} effacé correctement`,
    });
  }
);
// Replace Hero
app.put(
  "/heroes/:name",
  /* validateHero, */ async (req, res) => {
    const paramsName = req.params.name;
    const superheroName =
      paramsName.charAt(0).toUpperCase() + paramsName.slice(1);
    const newHero = req.body;
    const updatedHero = await Superhero.replaceOne(
      { name: superheroName },
      newHero
    );

    res.json({
      message: `${superheroName} a bien été remplacé`,
      preuve: updatedHero,
    });
  }
);

// Hero's power
app.get("/heroes/:name/power", async (req, res) => {
  const paramsName = req.params.name;
  const superheroName =
    paramsName.charAt(0).toUpperCase() + paramsName.slice(1);
  const superhero = await Superhero.findOne({ name: superheroName });

  res.json({
    status: "Here are your superhero's powers",
    data: superhero.power,
  });
});
// Add new power
app.patch("/heroes/:name/power", async (req, res) => {
  const paramsName = req.params.name;
  const superheroName =
    paramsName.charAt(0).toUpperCase() + paramsName.slice(1);
  const newPower = req.body.power;
  await Superhero.updateOne(
    { name: superheroName },
    { $push: { power: newPower } }
  );

  res.json({
    message: "Pouvoir ajouté !",
    data: newPower,
  });
});
// Delete a power
app.delete("/heroes/:name/power/:power", async (req, res) => {
  const paramsName = req.params.name;
  const superheroName =
    paramsName.charAt(0).toUpperCase() + paramsName.slice(1);
  const powerToRemove = req.params.power;
  await Superhero.updateOne(
    { name: superheroName },
    { $pull: { power: powerToRemove } }
  );

  res.json({
    message: "Pourvoir supprimé !",
    data: powerToRemove,
  });
});

// Listening Port
app.listen(process.env.PORT, () => {
  console.log("Listening on port 5000");
});
