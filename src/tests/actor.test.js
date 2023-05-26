const request = require("supertest");
const app = require("../app.js");

let actorId;

test("POST /actors debe retornar status 201", async () => {
  const body = {
    firstName: "Bruce",
    lastName: "Willis",
    nationality: "German",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Bruce_Willis_by_Gage_Skidmore_3.jpg/330px-Bruce_Willis_by_Gage_Skidmore_3.jpg",
    birthday: "1955-03-19",
  };
  const res = await request(app).post("/actors").send(body);
  actorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /actors debe retornar todos los actores", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /actors/:id debe actualizar un actor", async () => {
  const actorUpdated = {
    nationality: "Aleman",
  };
  const res = await request(app).put(`/actors/${actorId}`).send(actorUpdated);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(actorUpdated.name);
});

test("DELETE /actors/:id debe eliminar un actor", async () => {
  const res = await request(app).delete(`/actors/${actorId}`);
  expect(res.status).toBe(204);
});
