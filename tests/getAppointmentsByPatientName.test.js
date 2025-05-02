const request = require("supertest");
const { expect } = require("chai");

const baseURL = "https://api-citas-sy35.onrender.com/api";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ2MDc1NzYxLCJleHAiOjE3NDYwNzkzNjF9.bHGD61dCNSMiuwJK2EK5Ejl15se2fq2-gITtUnWW6zE";

describe("Appointments API - Get Appointments by Patient Name", () => {
  it("✅ Should return appointments matching the patient name", async () => {
    const patientName = "Juan Pérez";

    const res = await request(baseURL)
      .get(`/appointments`)
      .query({ patientName })
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("✅ Should return empty array if no matches", async () => {
    const patientName = "PacienteQueNoExiste";

    const res = await request(baseURL)
      .get(`/appointments`)
      .query({ patientName })
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array").that.is.empty;
  });

  it("❌ Should return 400 if patientName query is missing", async () => {
    const res = await request(baseURL)
      .get(`/appointments`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message", "El parámetro 'patientName' es requerido");
  });

  it("❌ Should return 401 if no token is provided", async () => {
    const patientName = "Juan";

    const res = await request(baseURL)
      .get(`/appointments`)
      .query({ patientName });

    expect(res.status).to.equal(401);
  });
});
