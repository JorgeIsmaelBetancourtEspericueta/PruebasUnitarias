const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://api-citas-sy35.onrender.com/api/appointments";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ2MDc1OTI2LCJleHAiOjE3NDYwNzk1MjZ9.rcy2uTx1k9robTgfSKqQ-0SNpuDOfqZmJiHiG6DaafY";

describe("GET /appointments?patientName=... - Filtrar citas por nombre del paciente", () => {
  it("Debe devolver una lista de citas si el nombre del paciente existe", async () => {
    const patientName = "Juan Pérez"; // Asegúrate de que exista al menos una cita con este nombre

    const res = await request(API_URL)
      .get(`/?patientName=${encodeURIComponent(patientName)}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    res.body.forEach(cita => {
      expect(cita).to.have.property("patientName", patientName);
    });
  });

  it("Debe devolver una lista vacía si no hay coincidencias", async () => {
    const patientName = "NombreInexistente123";

    const res = await request(API_URL)
      .get(`/?patientName=${encodeURIComponent(patientName)}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array").that.is.empty;
  });

  it("Debe devolver error 400 si no se proporciona 'patientName'", async () => {
    const res = await request(API_URL)
      .get("/")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message", "El parámetro 'patientName' es requerido");
  });

  it("Debe devolver error 401 si no se envía el token", async () => {
    const res = await request(API_URL)
      .get("/?patientName=Juan Pérez");

    expect(res.status).to.equal(401);
  });
});
