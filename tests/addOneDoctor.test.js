const request = require("supertest");
const { expect } = require("chai");

const baseURL = "https://api-citas-sy35.onrender.com/api";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ1MTAwNDkzLCJleHAiOjE3NDUxMDQwOTN9.B5U6l2vhBXMAkNP9b7VGHe7RY6uIlVscUdaaXrp-wEQ";

describe("Doctors API - Register new doctor", () => {
  it("Should register a doctor successfully", async () => {
    const newDoctor = {
      cedula: "33333",
      nombre: "Dr. Jorge Betancourt",
      especialidad: "Dermatología",
    };

    const res = await request(baseURL)
      .post("/doctors/newDoctor")
      .set("Authorization", `Bearer ${token}`)
      .send(newDoctor);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property(
      "message",
      "Doctor agregado correctamente"
    );
    expect(res.body).to.have.property("id");
  });

  it("Should return 400 error if required fields are missing", async () => {
    const incompleteDoctor = {
      nombre: "Dr. Jorge Betancourt",
    };

    const res = await request(baseURL)
      .post("/doctors/newDoctor")
      .set("Authorization", `Bearer ${token}`)
      .send(incompleteDoctor);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property(
      "error",
      "Faltan campos obligatorios o formato inválido. Verifique los datos enviados."
    );
  });

  it("Should return 400 error if license number has invalid format", async () => {
    const doctorWithInvalidLicense = {
      cedula: "3", // Aquí asumo que este formato no es válido según la lógica de backend
      nombre: "Dr. José Betancourt",
      especialidad: "Dermatología",
    };

    const res = await request(baseURL)
      .post("/doctors/newDoctor")
      .set("Authorization", `Bearer ${token}`)
      .send(doctorWithInvalidLicense);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property(
      "error",
      "Faltan campos obligatorios o formato inválido. Verifique los datos enviados."
    );
  });

  it("Should return 409 error if license number is already registered", async () => {
    const duplicateDoctor = {
      cedula: "222",
      nombre: "Dr. Alberto Ibarra",
      especialidad: "Dermatología",
    };

    // Primera vez: se registra correctamente
    await request(baseURL)
      .post("/doctors/newDoctor")
      .set("Authorization", `Bearer ${token}`)
      .send(duplicateDoctor);

    // Segunda vez: intenta registrar la misma cédula
    const res = await request(baseURL)
      .post("/doctors/newDoctor")
      .set("Authorization", `Bearer ${token}`)
      .send(duplicateDoctor);

    expect(res.status).to.equal(409);
    expect(res.body).to.have.property(
      "error",
      "La cédula profesional ya está registrada para otro doctor"
    );
  });
});
