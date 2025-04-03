const request = require("supertest");
const { expect } = require("chai");

const API_URL = "https://jsonplaceholder.typicode.com";

describe("API de citas médicas - GetAppointmentsHistory", () => {
    it("Debe obtener el historial de citas de un doctor", async () => {
      const doctorId = 1;
      const res = await request(API_URL).get(`/appointments/${doctorId}/history`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body).to.have.length.greaterThan(0);
    });
  
    it("Debe retornar un mensaje si el doctor no tiene citas previas", async () => {
      const doctorId = 2;
      const res = await request(API_URL).get(`/appointments/${doctorId}/history`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("mensaje", "No tiene citas agendadas el doctor");
    });
  
    it("Debe retornar 404 si el doctor no existe", async () => {
      const doctorId = 9999;
      const res = await request(API_URL).get(`/appointments/${doctorId}/history`);
      expect(res.status).to.equal(404);
    });
  
    it("Debe retornar 400 si el ID del doctor no es un número válido", async () => {
      const doctorId = "abc";
      const res = await request(API_URL).get(`/appointments/${doctorId}/history`);
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error", "El ID del doctor debe ser un número válido");
    });
  });
  