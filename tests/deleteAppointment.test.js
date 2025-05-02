const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://api-citas-sy35.onrender.com/api/citas";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ2MDc1OTI2LCJleHAiOjE3NDYwNzk1MjZ9.rcy2uTx1k9robTgfSKqQ-0SNpuDOfqZmJiHiG6DaafY";

describe("DELETE /citas/:id - Eliminar una cita", () => {
  it("Debe eliminar correctamente una cita válida y futura", async () => {
    const citaId = "12345"; // ID de una cita válida y futura

    const res = await request(API_URL)
      .delete(`/${citaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("mensaje", "Cita cancelada exitosamente");
  });

  it("Debe devolver error 400 si el ID es inválido (no numérico)", async () => {
    const res = await request(API_URL)
      .delete("/invalido123")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error", "El ID de la cita no es válido");
  });

  it("Debe devolver error 404 si la cita no existe", async () => {
    const citaId = "9999999"; // ID inexistente

    const res = await request(API_URL)
      .delete(`/${citaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("error", "No existe una cita con el ID proporcionado");
  });

  it("Debe devolver error 403 si la cita ya pasó", async () => {
    const citaId = "777"; // ID de una cita pasada

    const res = await request(API_URL)
      .delete(`/${citaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(403);
    expect(res.body).to.have.property("error", "La cita ya pasó y no puede ser cancelada");
  });

  it("Debe devolver error 409 si la cita es para hoy", async () => {
    const citaId = "888"; // ID de una cita para hoy

    const res = await request(API_URL)
      .delete(`/${citaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(409);
    expect(res.body).to.have.property("error", "La cita no pudo ser eliminada");
  });

  it("Debe devolver error 401 si no se proporciona el token", async () => {
    const citaId = "12345";

    const res = await request(API_URL)
      .delete(`/${citaId}`);

    expect(res.status).to.equal(401);
  });
});
