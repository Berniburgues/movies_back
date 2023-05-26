const request = require("supertest");
const app = require("../app.js");

let directorId;

test("POST /directors debe retornar status 201", async () => {
  const body = {
    firstName: "Quentin",
    lastName: "Tarantino",
    nationality: "EEUU",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Quentin_Tarantino_by_Gage_Skidmore.jpg/330px-Quentin_Tarantino_by_Gage_Skidmore.jpg",
    birthday: "1963-03-27",
  };
  const res = await request(app).post("/directors").send(body);
  directorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /directors debe retornar todos los directores", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /directors/:id debe actualizar un director", async () => {
  const directorUpdated = {
    nationality: "Estadounidense",
  };
  const res = await request(app)
    .put(`/directors/${directorId}`)
    .send(directorUpdated);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(directorUpdated.name);
});

test("DELETE /directors/:id debe eliminar un director", async () => {
  const res = await request(app).delete(`/directors/${directorId}`);
  expect(res.status).toBe(204);
});
