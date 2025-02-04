import request from "supertest";
// import app from "../index.js";  // Make sure index.js is exporting `app`
// import app from "./../index.js"
import app from "../index.js";

describe("GET /", () => {
  it("should return 200", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });
});
