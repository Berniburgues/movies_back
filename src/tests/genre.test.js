const request = require("supertest");
const app = require("../app.js");

let genreId;

test("POST /genres debe retornar status 201", async () => {
  const body = {
    name: "Acción",
  };
  const res = await request(app).post("/genres").send(body);
  genreId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /genres debe retornar todos los géneros", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /genres/:id debe actualizar un género", async () => {
  const genreUpdated = {
    name: "Aventura",
  };
  const res = await request(app).put(`/genres/${genreId}`).send(genreUpdated);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(genreUpdated.name);
});

test("DELETE /genres/:id debe eliminar un género", async () => {
  const res = await request(app).delete(`/genres/${genreId}`);
  expect(res.status).toBe(204);
});
