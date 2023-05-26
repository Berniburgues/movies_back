const request = require("supertest");
const app = require("../app.js");
const Actor = require("../models/Actor.js");
const Director = require("../models/Director.js");
const Genre = require("../models/Genre.js");
require("../models");

let movieId;

test("POST /movies debe retornar status 201", async () => {
  const body = {
    name: "Kill Bill: Volume I",
    image:
      "https://th.bing.com/th/id/R.db4dbb48348091e56641a6d098a4801b?rik=0jCf1kEUiOA1lA&pid=ImgRaw&r=0",
    synopsis:
      "El día de su boda, una asesina profesional (Thurman) sufre el ataque de algunos miembros de su propia banda, que obedecen las órdenes de Bill (David Carradine), el jefe de la organización criminal. Logra sobrevivir al ataque, aunque queda en coma. Cuatro años después despierta dominada por un gran deseo de venganza.",
    releaseYear: "2003-11-27",
  };
  const res = await request(app).post("/movies").send(body);
  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /movies debe retornar todas las películas", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /movies/:id debe actualizar una película", async () => {
  const movieUpdated = {
    name: "Kill Bill",
  };
  const res = await request(app).put(`/movies/${movieId}`).send(movieUpdated);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movieUpdated.name);
});

test("POST /movies/:id/actors debe setear los actores a las películas", async () => {
  const actor = await Actor.create({
    firstName: "Ricardo",
    lastName: "Darín",
    nationality: "Argentina",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Marcozz.jpg",
    birthday: "1957-01-16",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/directors debe setear los directores a las películas", async () => {
  const director = await Director.create({
    firstName: "Mel",
    lastName: "Gibson",
    nationality: "EEUU",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Mel_Gibson_Cannes_2016.jpg/330px-Mel_Gibson_Cannes_2016.jpg",
    birthday: "1953-01-03",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/genres debe setear los géneros a las películas", async () => {
  const genre = await Genre.create({
    name: "Terror",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("DELETE /movies/:id debe eliminar una película", async () => {
  const res = await request(app).delete(`/movies/${movieId}`);
  expect(res.status).toBe(204);
});
