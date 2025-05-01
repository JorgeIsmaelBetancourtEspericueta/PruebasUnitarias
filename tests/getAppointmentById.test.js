const request = require("supertest");
const { expect } = require("chai");

const baseURL = "https://api-citas-sy35.onrender.com/api";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ2MDc3NjYzLCJleHAiOjE3NDYwODEyNjN9.1vtnVSSxuvRwP1ONU-WdudUI5yP_IHGj6X_kKsSaGS4"; // Usa tu token real aquí

describe("Appointments API - Get Appointment by ID", () => {
  it("✅ Should return a specific appointment by doctor and cita ID", async () => {
    const doctorId = 101;
    const idCita = 123;

    const res = await request(baseURL)
      .get(`/appointments/${doctorId}/appointments/${idCita}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("idCita", idCita);
    expect(res.body).to.have.property("paciente");
    expect(res.body).to.have.property("fechaHora");
  });

  it("❌ Should return 404 if the appointment does not exist", async () => {
    const doctorId = 101;
    const idCita = 9999;

    const res = await request(baseURL)
      .get(`/appointments/${doctorId}/appointments/${idCita}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("error").that.includes("no se encontró");
  });

  it("❌ Should return 401 if no token is provided", async () => {
    const doctorId = 101;
    const idCita = 123;

    const res = await request(baseURL)
      .get(`/appointments/${doctorId}/appointments/${idCita}`);

    expect(res.status).to.equal(401);
  });
});
