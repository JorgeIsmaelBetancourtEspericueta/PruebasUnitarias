const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://api-citas-sy35.onrender.com/api/doctors";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ2MDc1OTI2LCJleHAiOjE3NDYwNzk1MjZ9.rcy2uTx1k9robTgfSKqQ-0SNpuDOfqZmJiHiG6DaafY";

describe("GET /doctors/medicos/:id/disponibilidad - Obtener disponibilidad de un doctor", () => {
  it("Debe devolver la disponibilidad correctamente", async () => {
    const doctorId = "doctor123"; // Reemplaza por un ID válido con disponibilidad definida

    const res = await request(API_URL)
      .get(`/medicos/${doctorId}/disponibilidad`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("disponibilidad").that.is.an("array");
  });

  it("Debe retornar un array vacío si el doctor no tiene disponibilidad registrada", async () => {
    const doctorId = "doctorSinDisponibilidad"; // ID de doctor existente pero sin el campo `disponibilidad`

    const res = await request(API_URL)
      .get(`/medicos/${doctorId}/disponibilidad`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("disponibilidad").that.is.an("array").that.is.empty;
  });

  it("Debe retornar 404 si el doctor no existe", async () => {
    const doctorId = "doctorInexistente123";

    const res = await request(API_URL)
      .get(`/medicos/${doctorId}/disponibilidad`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("error", "No se encontró un médico con el ID proporcionado");
  });

  it("Debe retornar 401 si no se envía el token", async () => {
    const doctorId = "doctor123";

    const res = await request(API_URL)
      .get(`/medicos/${doctorId}/disponibilidad`);

    expect(res.status).to.equal(401);
  });
});
