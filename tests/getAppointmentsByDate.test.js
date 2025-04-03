const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://jsonplaceholder.typicode.com";

describe("API de citas médicas - GetAppointmentsByDate", () => {
  it("Debe obtener todas las citas agendadas para una fecha específica", async () => {
    const doctorId = 1;
    const date = "2025-04-03";
    const res = await request(API_URL).get(`/appointments/${doctorId}/${date}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("Debe retornar un mensaje si no hay citas en la fecha seleccionada", async () => {
    const doctorId = 1;
    const date = "2025-12-25";
    const res = await request(API_URL).get(`/appointments/${doctorId}/${date}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property(
      "mensaje",
      "No hay citas agendadas para la fecha seleccionada"
    );
  });

  it("Debe retornar 400 si el formato de la fecha es inválido", async () => {
    const doctorId = 1;
    const date = "03-04-2025"; // Formato incorrecto
    const res = await request(API_URL).get(`/appointments/${doctorId}/${date}`);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property(
      "error",
      "Formato de fecha inválido. Use el formato YYYY-MM-DD"
    );
  });
});
