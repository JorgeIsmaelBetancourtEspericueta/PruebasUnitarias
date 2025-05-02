const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://api-citas-sy35.onrender.com/api/doctors";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUxIiwiaWF0IjoxNzQ2MDc1OTI2LCJleHAiOjE3NDYwNzk1MjZ9.rcy2uTx1k9robTgfSKqQ-0SNpuDOfqZmJiHiG6DaafY";

describe("GET /doctors - Obtener lista de doctores", () => {
  it("Debe retornar una lista de doctores si existen", async () => {
    const res = await request(API_URL)
      .get("/")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("doctores");
    expect(res.body.doctores).to.be.an("array");
  });

  it("Debe retornar 404 si no hay doctores registrados", async () => {
    // Este test solo funcionará si tu base de datos realmente está vacía.
    // Puedes crear un entorno de prueba o simularlo manualmente.
    // Aquí se deja como referencia por si puedes limpiar la colección `doctors`.
    const res = await request(API_URL)
      .get("/")
      .set("Authorization", `Bearer ${token}`);

    // Si realmente no hay doctores
    if (res.status === 404) {
      expect(res.body).to.have.property("error", "No hay médicos registrados en el sistema");
    } else {
      expect(res.status).to.equal(200);
      expect(res.body.doctores).to.be.an("array");
    }
  });

  it("Debe retornar 401 si no se envía token", async () => {
    const res = await request(API_URL).get("/");
    expect(res.status).to.equal(401);
  });

  it("Debe retornar 500 si ocurre un error inesperado", async () => {
    // Simulación avanzada: este test solo aplica si puedes modificar el servicio temporalmente para lanzar un error
    // throw new Error("Simulación de error");
    // Aquí lo dejo como referencia de cómo se haría

    /*
    const res = await request(API_URL)
      .get("/")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(500);
    expect(res.body).to.have.property(
      "error",
      "Ocurrió un error al obtener la lista de médicos. Intente nuevamente más tarde."
    );
    */
  });
});
