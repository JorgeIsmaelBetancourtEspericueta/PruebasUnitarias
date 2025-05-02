const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://api-citas-sy35.onrender.com/api/citas";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ2MDc1OTI2LCJleHAiOjE3NDYwNzk1MjZ9.rcy2uTx1k9robTgfSKqQ-0SNpuDOfqZmJiHiG6DaafY";

describe("PATCH /:idPaciente/appointments/:idCita/confirm - Confirmar asistencia", () => {
  it("Debe confirmar una cita correctamente", async () => {
    const idPaciente = 123456; // Reemplazar con un paciente real
    const idCita = 111; // Reemplazar con un ID de cita válido

    const res = await request(API_URL)
      .patch(`/${idPaciente}/appointments/${idCita}/confirm`)
      .set("Authorization", `Bearer ${token}`)
      .send({ confirmada: true });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("mensaje", "Estado de confirmación actualizado correctamente");
    expect(res.body).to.include({ idCita, confirmada: true });
  });

  it("Debe devolver error 400 si no se envía el campo 'confirmada'", async () => {
    const idPaciente = 123456;
    const idCita = 111;

    const res = await request(API_URL)
      .patch(`/${idPaciente}/appointments/${idCita}/confirm`)
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message", "El campo 'confirmada' es obligatorio");
  });

  it("Debe devolver error 400 si 'confirmada' no es booleano", async () => {
    const idPaciente = 123456;
    const idCita = 111;

    const res = await request(API_URL)
      .patch(`/${idPaciente}/appointments/${idCita}/confirm`)
      .set("Authorization", `Bearer ${token}`)
      .send({ confirmada: "sí" });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message", "El valor de 'confirmada' debe ser true o false");
  });

  it("Debe devolver error 404 si la cita no existe", async () => {
    const idPaciente = 123456;
    const idCita = 99999; // ID de cita que no existe

    const res = await request(API_URL)
      .patch(`/${idPaciente}/appointments/${idCita}/confirm`)
      .set("Authorization", `Bearer ${token}`)
      .send({ confirmada: true });

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("message", "Cita no encontrada");
  });

  it("Debe devolver error 400 si el ID de paciente no es válido", async () => {
    const res = await request(API_URL)
      .patch(`/abc123/appointments/111/confirm`)
      .set("Authorization", `Bearer ${token}`)
      .send({ confirmada: true });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message", "ID de paciente inválido");
  });

  it("Debe devolver error 401 si no se proporciona token", async () => {
    const res = await request(API_URL)
      .patch(`/123456/appointments/111/confirm`)
      .send({ confirmada: true });

    expect(res.status).to.equal(401);
  });
});
