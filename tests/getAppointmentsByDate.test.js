const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://api-citas-sy35.onrender.com/api/appointments";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ1MTA5MzUxLCJleHAiOjE3NDUxMTI5NTF9.SDoWaSmWTQsdockJNWUQeC3WNPPzsJxIsjSOwlgOJzA";

describe("GET /appointments/{doctorId}/{date} - GetAppointmentsByDate", () => {
  it("Debería retornar las citas agendadas para un doctor en una fecha válida", async () => {
    const doctorId = 104; 
    const date = "2025-04-15";

    const res = await request(API_URL)
      .get(`/${doctorId}/${date}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("appointments").that.is.an("array");
  });

  it("Debería retornar un mensaje si no hay citas para esa fecha", async () => {
    const doctorId = 104; 
    const date = "2025-04-16";

    const res = await request(API_URL)
      .get(`/${doctorId}/${date}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property(
      "mensaje",
      "No hay citas agendadas para la fecha seleccionada"
    );
  });

  it("Debería retornar 400 si el doctor no existe", async () => {
    const doctorId = 9999; // Doctor que no existe
    const date = "2025-01-01";

    const res = await request(API_URL)
      .get(`/${doctorId}/${date}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error");
  });

  it("Debería retornar 400 si el formato de la fecha es inválido", async () => {
    const doctorId = 104;
    const invalidDate = "01-01-2025"; // Formato incorrecto

    const res = await request(API_URL)
      .get(`/${doctorId}/${invalidDate}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property(
      "error",
      "Formato de fecha inválido. Use el formato YYYY-MM-DD"
    );
  });
});
