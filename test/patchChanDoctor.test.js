const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://api-citas-sy35.onrender.com/apicitas/:id/cambiar-medico";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ2MTU5MDQ4LCJleHAiOjE3NDYxNjI2NDh9.qzYClTP_c3Q2ZlWouzi5-HVU2b0Mvy4KBs_i0jPWSQU";

describe("Medical Appointments API - ChangeDoctor", () => {
  it("Deberia cambiar al doctor a una cita especifica", async () => {
    const appointmentId = 401;
    const newDoctorId = 105;

    const res = await request(API_URL)
      .patch(`/${appointmentId}/change-doctor`)
      .send({ newDoctorId })
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property(
      "mensaje",
      "Médico cambiado correctamente"
    );
  });

  it("Deberia regresar 400 si el nuevo doctor no existe", async () => {
    const appointmentId = 201;

    const res = await request(API_URL)
      .patch(`/${appointmentId}/change-doctor`)
      .send({}) // falta el newDoctorId
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property(
      "error",
      "Debe proporcionar un nuevo ID de médico"
    );
  });
});
