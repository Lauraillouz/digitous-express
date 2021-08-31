const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
// Port
const PORT = 3002;

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

let superHeroes = [
  {
    name: "Iron Man",
    power: ["money"],
    color: "red",
    isAlive: true,
    age: 46,
    image:
      "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart",
  },
  {
    name: "Thor",
    power: ["electricty", "worthy"],
    color: "blue",
    isAlive: true,
    age: 300,
    image:
      "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg",
  },
  {
    name: "Daredevil",
    power: ["blind"],
    color: "red",
    isAlive: false,
    age: 30,
    image:
      "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg",
  },
];

const debug = (req, res, next) => {
  const auth = true;
  if (auth) {
    console.log("Server has been sollicitated");
    next();
  } else {
    console.log("Server has not been sollicitated");
  }
};

const transformName = (req, res, next) => {
  req.body.name = req.body.name.toLowerCase();
  next();
};

// Middleware global
app.use((req, res, next) => {
  next();
});

// Routes
app.get("/", debug, (req, res) => {
  res.json({
    message: "OK",
  });
});

app.get("/heroes", (req, res) => {
  res.json({
    superHeroes,
  });
});
app.patch("/heroes", transformName, (req, res) => {
  const newHero = req.body;
  superHeroes = superHeroes.push(newHero);
  console.log(superHeroes);
  console.log(newHero);
  res.json({
    message: "Ok, héros ajouté",
  });
});

app.get("/heroes/:name", (req, res) => {
  let heroName = req.params;
  let hero = superHeroes.filter(
    (hero) =>
      hero.name.toLocaleLowerCase().replace(/\s+/g, "") === heroName.name
  );
  res.json({
    hero,
  });
});

app.get("/heroes/:name/power", (req, res) => {
  let heroName = req.params;
  let hero = superHeroes.filter(
    (hero) =>
      hero.name.toLocaleLowerCase().replace(/\s+/g, "") === heroName.name
  );
  res.json({
    power: hero[0].power,
  });
});
app.patch("/heroes/:name/power", (req, res) => {
  let heroName = req.params;
  let hero = superHeroes.filter(
    (hero) =>
      hero.name.toLocaleLowerCase().replace(/\s+/g, "") === heroName.name
  );
  let newPower = hero[0].power;
  newPower = newPower.push("blabla");
  console.log(hero[0].power);
  res.json({
    message: "Pouvoir ajouté !",
  });
});

// Listening Port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
