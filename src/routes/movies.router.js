const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setMoviesActors,
  setMoviesDirectors,
  setMoviesGenres,
} = require("../controllers/movies.controller");
const express = require("express");

const routerMovies = express.Router();

routerMovies.route("/").get(getAll).post(create);

routerMovies.route("/:id").get(getOne).delete(remove).put(update);

routerMovies.route("/:id/actors").post(setMoviesActors);

routerMovies.route("/:id/directors").post(setMoviesDirectors);

routerMovies.route("/:id/genres").post(setMoviesGenres);

module.exports = routerMovies;
