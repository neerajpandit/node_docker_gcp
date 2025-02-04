import request from "supertest";
// import app from "../index.js";
import { server,app } from "../index.js";

describe("GET /", () => {
  it("should return 200", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });
});

// Close the server after all tests
afterAll((done) => {
    server.close(done);
  });