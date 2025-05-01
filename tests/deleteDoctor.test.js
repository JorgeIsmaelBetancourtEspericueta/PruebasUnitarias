const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://api-citas-sy35.onrender.com/api/doctors";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ2MDc1OTI2LCJleHAiOjE3NDYwNzk1MjZ9.rcy2uTx1k9robTgfSKqQ-0SNpuDOfqZmJiHiG6DaafY";

describe("DELETE /doctors/:id - Eliminar doctor", () => {
  it("Debe eliminar un doctor sin citas pendientes", async () => {
    const idDoctor = "idDoctorSinCitas"; // Reemplaza por un ID real que no tenga citas pendientes

    const res = await request(API_URL)
      .delete(`/${idDoctor}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("mensaje", "Doctor eliminado exitosamente");
  });

  it("Debe retornar 400 si el ID tiene formato incorrecto", async () => {
    const res = await request(API_URL)
      .delete("/id$$malformado")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property(
      "error",
      "El ID proporcionado no es válido o tiene un formato incorrecto"
    );
  });

  it("Debe retornar 404 si el doctor no existe", async () => {
    const res = await request(API_URL)
      .delete("/idQueNoExiste123")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property(
      "error",
      "No existe un doctor con el ID proporcionado en la base de datos"
    );
  });

  it("Debe retornar 409 si el doctor tiene citas activas", async () => {
    const idDoctor = "idDoctorConCitas"; // Reemplaza por un ID real que tenga citas pendientes

    const res = await request(API_URL)
      .delete(`/${idDoctor}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(409);
    expect(res.body).to.have.property(
      "error",
      "El doctor tiene citas activas y no puede ser eliminado hasta que se reasignen o cancelen"
    );
  });

  it("Debe retornar 401 si no se envía token", async () => {
    const res = await request(API_URL).delete("/cualquierId");
    expect(res.status).to.equal(401);
  });
});
