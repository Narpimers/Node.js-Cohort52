import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("get /", () => {
    it(`it should return status code 200 and "Hello from backend to frontend!"`, (done) => {
      request.get('/')
      .expect(200, 'Hello from backend to frontend!', done)
    });
  });``


  describe("POST /weather", () => {
    it('should return status code 400 and "Missing name of city" if no cityName', (done) => {
      request.post('/weather')
        .send({ cityName: "" })
        .expect(400, `{"error":"Missing name of city"}`, done)
    });

    it('should return status code 200 and contain "City: Amsterdam" and "temperature"', (done) => {
        request.post('/weather')
          .send({ cityName: "Amsterdam" })
          .expect(200)
          .expect(res => {
            if (!res.text.includes("City: Amsterdam")) {
              throw new Error('Response does not include "City: Amsterdam"');
            }
            if (!res.text.toLowerCase().includes("temperature")) {
              throw new Error('Response does not include "temperature"');
            }
          })
          .end(done);
    });

      it('should return status code 400 and "weatherText": "Error: city not found" if typing error', (done) => {
        request.post('/weather')
          .send({ cityName: "Amesterdam" })
          .expect(400, `{"weatherText":"Error: city not found"}`, done)
      });
  });