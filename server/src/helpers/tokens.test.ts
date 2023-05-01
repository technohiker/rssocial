import jwt from "jsonwebtoken";
import { createToken } from "./tokens";
import { SECRET_KEY } from "../config";

describe("createToken", function () {
  test("passes in values", function () {
    const token = createToken({ username: "test", email: "testuser@test.com" });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      email: "testuser@test.com"
    });
  });

  test("includes JWT sign options", function () {
    const token = createToken({ username: "test", email: "testuser@test.com" },{expiresIn: '60s'})
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
        iat: expect.any(Number),
        exp: expect.any(Number),
        username: "test",
        email: "testuser@test.com"
    })
  })
})