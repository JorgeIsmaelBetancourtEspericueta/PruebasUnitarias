const request = require("supertest");
const { expect } = require("chai");

const baseURL = "https://api-citas-sy35.onrender.com/api";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ2MDc2NDM2LCJleHAiOjE3NDYwODAwMzZ9.lN0GZ_eDv6MEeAIpdM3JCBEhYoz_NrHGV7qX_w67ynI";

describe("Doctors API - Update Doctor Data (PATCH /doctors/:idDoctor)", () => {
  it("✅ Should successfully update the doctor's name", async () => {
    const doctorId = "101"; // 👈 Cambia a uno real
    const updateData = { nombre: "Dr. Carlos Ramírez Lopez " };

    const res = await request(baseURL)
      .patch(`/doctors/${doctorId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateData);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Datos del doctor actualizados correctamente.");
  });

  it("❌ Should not allow updating the specialty", async () => {
    const doctorId = "101";
    const updateData = { especialidad: "Cardiología" };

    const res = await request(baseURL)
      .patch(`/doctors/${doctorId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateData);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error", "No se permite modificar la especialidad");
  });

  it("❌ Should return 400 if no valid fields provided", async () => {
    const doctorId = "101";
    const updateData = { correo: "test@example.com" }; // 👈 Campo que no es permitido

    const res = await request(baseURL)
      .patch(`/doctors/${doctorId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateData);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error", "No se proporcionaron campos válidos para actualizar");
  });

  it("✅ Should update and move doctor to a new ID", async () => {
    const doctorId = "101";
    const updateData = { idDoctor: "99" }; // 👈 Cambiar ID (hazlo con cuidado)

    const res = await request(baseURL)
      .patch(`/doctors/${doctorId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateData);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.include("Doctor actualizado y movido al nuevo ID");
  });

  it("❌ Should return 404 if doctor not found", async () => {
    const doctorId = "9999"; // ID inexistente
    const updateData = { nombre: "Test Inexistente" };

    const res = await request(baseURL)
      .patch(`/doctors/${doctorId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateData);

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("error", "Doctor no encontrado");
  });
});
