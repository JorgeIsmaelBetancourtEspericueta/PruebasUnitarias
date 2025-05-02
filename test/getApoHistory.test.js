const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://api-citas-sy35.onrender.com/api/appointments/:doctorId/history";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ2MTU5MDQ4LCJleHAiOjE3NDYxNjI2NDh9.qzYClTP_c3Q2ZlWouzi5-HVU2b0Mvy4KBs_i0jPWSQU";

describe("Medical Appointments API - MedicalHistory", () => {
  it("Deberia regresar el historial medico de un paciente", async () => {
    const patientId = 104;

    const res = await request(API_URL)
      .get(`/patient/${patientId}/medical-history`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("historial").that.is.an("array");
  });

  it("Deberia regresar 404 si no encuentra el historial del paciente", async () => {
    const idCita = 301;

    const res = await request(API_URL)
      .get(`/patient/${idCita}/medical-history`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(404);
  });
});