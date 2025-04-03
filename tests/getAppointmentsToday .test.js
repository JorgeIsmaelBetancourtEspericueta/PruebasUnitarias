const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://jsonplaceholder.typicode.com";

describe("API de citas médicas (Prueba con API externa)", () => {
  it("Debe obtener todas las citas agendadas para hoy de un doctor específico", async () => {
    const doctorId = 1;
    const res = await request(API_URL).get(`/appointments/${doctorId}/today`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("Debe retornar un mensaje si no hay citas agendadas", async () => {
    const doctorId = 2;
    const res = await request(API_URL).get(`/appointments/${doctorId}/today`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("mensaje", "No tiene citas agendadas para hoy");
  });

  it("Debe retornar 404 si el doctor no existe", async () => {
    const doctorId = 9999;
    const res = await request(API_URL).get(`/appointments/${doctorId}/today`);
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("error", `El doctor con ID ${doctorId} no fue encontrado`);
  });

});
