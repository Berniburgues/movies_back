const express = require("express");
const router = express.Router();
const routerActors = require("./actors.router");
const routerMovies = require("./movies.router");
const routerGenres = require("./genre.router");
const routerDirectors = require("./directors.router");

// colocar las rutas aquí
router.use("/movies", routerMovies);
router.use("/actors", routerActors);
router.use("/genres", routerGenres);
router.use("/directors", routerDirectors);

module.exports = router;
