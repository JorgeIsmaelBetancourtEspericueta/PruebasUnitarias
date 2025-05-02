const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://api-citas-sy35.onrender.com/api/appointments";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ1MTA5MzUxLCJleHAiOjE3NDUxMTI5NTF9.SDoWaSmWTQsdockJNWUQeC3WNPPzsJxIsjSOwlgOJzA";

describe("Medical Appointments API - GetAppointmentsHistory", () => {
  it("Should return the appointment history of a doctor", async () => {
    const doctorId = 104;
    const res = await request(API_URL)
      .get(`/${doctorId}/history`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("appointments").that.is.an("array");
  });

  it("Should return a message if the doctor has no previous appointments", async () => {
    const doctorId = 101; 
    const res = await request(API_URL)
      .get(`/${doctorId}/history`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property(
      "mensaje",
      "El doctor no tiene citas pasadas registradas"
    );
  });

  it("Should return 404 if the doctor does not exist", async () => {
    const doctorId = 9999;
    const res = await request(API_URL)
      .get(`${doctorId}/history`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(404);
  });

  it("Should return 400 if the doctor ID is not a valid number", async () => {
    const doctorId = "abc";
    const res = await request(API_URL)
      .get(`${doctorId}/history`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property(
      "error",
      "El ID del doctor debe ser un número válido"
    );
  });
});
