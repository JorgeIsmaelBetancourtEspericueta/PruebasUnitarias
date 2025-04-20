const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://api-citas-sy35.onrender.com/api";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ1MTAwNDkzLCJleHAiOjE3NDUxMDQwOTN9.B5U6l2vhBXMAkNP9b7VGHe7RY6uIlVscUdaaXrp-wEQ";

describe("API de citas médicas (Prueba con API externa)", () => {
  it("Debe obtener todas las citas agendadas para hoy de un doctor específico", async () => {
    const doctorId = 101;
    const res = await request(API_URL)
      .get(`/appointments/${doctorId}/today`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("Debe retornar un mensaje si no hay citas agendadas", async () => {
    const doctorId = 104;
    const res = await request(API_URL)
      .get(`/appointments/${doctorId}/today`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property(
      "mensaje",
      "No tiene citas agendadas para hoy"
    );
  });

  it("Debe retornar 404 si el doctor no existe", async () => {
    const doctorId = 200;
    const res = await request(API_URL)
      .get(`/appointments/${doctorId}/today`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property(
      "error",
      `El doctor con ID ${doctorId} no fue encontrado`
    );
  });
});
