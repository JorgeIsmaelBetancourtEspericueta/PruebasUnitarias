const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://api-citas-sy35.onrender.com/api/appointments";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ2MDc1OTI2LCJleHAiOjE3NDYwNzk1MjZ9.rcy2uTx1k9robTgfSKqQ-0SNpuDOfqZmJiHiG6DaafY";

describe("PATCH /appointments/:idCita/delegate - Reasignar cita a otro doctor", () => {
  it("Debe reasignar la cita correctamente", async () => {
    const idCita = "citaReasignable123"; // Reemplaza por un ID de cita válido
    const nuevoDoctorId = "doctorNuevo123"; // Reemplaza por un doctor válido y libre en ese horario

    const res = await request(API_URL)
      .patch(`/${idCita}/delegate`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nuevoDoctorId });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Médico asignado correctamente a la cita.");
  });

  it("Debe retornar 400 si no se envía 'nuevoDoctorId'", async () => {
    const idCita = "cualquierCita";

    const res = await request(API_URL)
      .patch(`/${idCita}/delegate`)
      .set("Authorization", `Bearer ${token}`)
      .send({}); // Sin nuevoDoctorId

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error", "El campo 'nuevoDoctorId' es requerido");
  });

  it("Debe retornar 404 si la cita no existe", async () => {
    const idCita = "citaInexistente123";
    const nuevoDoctorId = "doctorValido123";

    const res = await request(API_URL)
      .patch(`/${idCita}/delegate`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nuevoDoctorId });

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("error", "No se encontró la cita");
  });

  it("Debe retornar 400 si el nuevo doctor no existe", async () => {
    const idCita = "citaExistente123"; // Cita real
    const nuevoDoctorId = "doctorInvalidoXYZ"; // ID de doctor no existente

    const res = await request(API_URL)
      .patch(`/${idCita}/delegate`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nuevoDoctorId });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error", "El nuevo médico no es válido");
  });

  it("Debe retornar 400 si el nuevo doctor tiene conflicto de horario", async () => {
    const idCita = "citaConHorario";
    const nuevoDoctorId = "doctorConMismaHora"; // Ya tiene cita en ese horario

    const res = await request(API_URL)
      .patch(`/${idCita}/delegate`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nuevoDoctorId });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error", "El nuevo médico ya tiene una cita en ese horario");
  });

  it("Debe retornar 401 si no se envía el token", async () => {
    const idCita = "citaCualquiera";

    const res = await request(API_URL)
      .patch(`/${idCita}/delegate`)
      .send({ nuevoDoctorId: "doctor123" });

    expect(res.status).to.equal(401);
  });
});
