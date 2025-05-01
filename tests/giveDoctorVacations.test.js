const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://api-citas-sy35.onrender.com/api/doctors";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ2MDc1OTI2LCJleHAiOjE3NDYwNzk1MjZ9.rcy2uTx1k9robTgfSKqQ-0SNpuDOfqZmJiHiG6DaafY";

describe("PATCH /:idDoctor/vacation - Asignar vacaciones a un doctor", () => {
  it("Debe asignar vacaciones correctamente a un doctor existente", async () => {
    const doctorId = "1"; // Asegúrate que este ID exista en Firestore
    const res = await request(API_URL)
      .patch(`/${doctorId}/vacation`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        startDate: "2025-05-10",
        endDate: "2025-05-15"
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Vacaciones asignadas correctamente.");
  });

  it("Debe eliminar las vacaciones si no se envían fechas", async () => {
    const doctorId = "2"; // Usa un doctor válido
    const res = await request(API_URL)
      .patch(`/${doctorId}/vacation`)
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Vacaciones eliminadas correctamente.");
  });

  it("Debe retornar 404 si el doctor no existe", async () => {
    const doctorId = "1"; // ID inválido
    const res = await request(API_URL)
      .patch(`/${doctorId}/vacation`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        startDate: "2025-05-10",
        endDate: "2025-05-15"
      });

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("error", "Doctor no encontrado");
  });

  it("Debe retornar 400 si se asignan fechas en el pasado", async () => {
    const doctorId = "3"; // Doctor válido
    const res = await request(API_URL)
      .patch(`/${doctorId}/vacation`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        startDate: "2024-01-01",
        endDate: "2024-01-10"
      });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error", "conflicto en las fechas de vacaciones.");
  });
});
