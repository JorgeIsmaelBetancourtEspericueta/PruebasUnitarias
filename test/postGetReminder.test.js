const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://api-citas-sy35.onrender.com/api/patients/:idPaciente/appointments/:idCita/reminder";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ2MTU5MDQ4LCJleHAiOjE3NDYxNjI2NDh9.qzYClTP_c3Q2ZlWouzi5-HVU2b0Mvy4KBs_i0jPWSQU";

describe("Medical Appointments API - SendAppointmentReminder", () => {
  it("Deberia enviar un recordatorio para la cita proxima", async () => {
    const appointmentId = 123; // Usa un ID válido existente

    const res = await request(API_URL)
      .post(`/${appointmentId}/reminder`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property(
      "mensaje",
      "Recordatorio de cita enviado exitosamente"
    );
  });

  it("Deberia enviar 400 si no existe la cita", async () => {
    const appointmentId = 9999;

    const res = await request(API_URL)
      .post(`/${appointmentId}/reminder`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(404);
  });
});
