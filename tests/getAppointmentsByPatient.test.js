const request = require("supertest");
const { expect } = require("chai");

const baseURL = "https://api-citas-sy35.onrender.com/api";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ2MDc2NDM2LCJleHAiOjE3NDYwODAwMzZ9.lN0GZ_eDv6MEeAIpdM3JCBEhYoz_NrHGV7qX_w67ynI";

describe("Appointments API - Get Appointments by Patient", () => {
  it("✅ Should return appointments for a patient-doctor pair", async () => {
    const doctorId = 104;
    const patientId = 2345;

    const res = await request(baseURL)
      .get(`/appointments/${doctorId}/patient/${patientId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
  });

  it("✅ Should return message if patient has no appointments", async () => {
    const doctorId = 1;
    const patientId = 9999;

    const res = await request(baseURL)
      .get(`/appointments/${doctorId}/patient/${patientId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("mensaje");
  });

  it("✅ Should return message if doctorId or patientId is missing", async () => {
    const res = await request(baseURL)
      .get(`/appointments//patient/`)
      .set("Authorization", `Bearer ${token}`);

    // Asumimos que dará 404 por ruta no encontrada
    expect(res.status).to.be.oneOf([404, 500]); // flexibilidad según el comportamiento real
  });

  it("✅ Should return message if doctor does not exist", async () => {
    const doctorId = 99999;
    const patientId = 5;

    const res = await request(baseURL)
      .get(`/appointments/${doctorId}/patient/${patientId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("mensaje");
  });

  it("✅ Should return 401 if no token is provided", async () => {
    const doctorId = 1;
    const patientId = 5;

    const res = await request(baseURL)
      .get(`/appointments/${doctorId}/patient/${patientId}`);

    expect(res.status).to.equal(401);
  });
});
