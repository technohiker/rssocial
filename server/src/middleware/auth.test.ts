"use strict";

import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/ExpressError";
import { authenticateJWT, ensureLoggedIn, ensureCorrectUser, checkVerifyToken } from "./auth";


import { SECRET_KEY } from "../config";
const testJwt = jwt.sign({ id: 1, username: "test", email: 'test@test.com' }, SECRET_KEY);
const badJwt = jwt.sign({ id: 1, username: "test", email: 'test@test.com' }, "wrong");

const testVerJwt = jwt.sign({id: 1,username: "test", email: 'test@test.com'},SECRET_KEY,{expiresIn: '1h'})
const badVerJwt = jwt.sign({id: 1,username: "test", email: 'test@test.com'},"wrong",{expiresIn: '1h'})


describe("authenticateJWT", function () {
  test("works: via header", function () {
    expect.assertions(2);
    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const req: any ={ headers: { authorization: `Bearer ${testJwt}` } };
    const res: any ={ locals: {} };
    const next = function (err: any) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: "test",
        isAdmin: false,
      },
    });
  });

  test("works: no header", function () {
    expect.assertions(2);
    const req: any ={};
    const res: any ={ locals: {} };
    const next = function (err: any) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });

  test("works: invalid token", function () {
    expect.assertions(2);
    const req: any ={ headers: { authorization: `Bearer ${badJwt}` } };
    const res: any ={ locals: {} };
    const next = function (err: any) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
});


describe("ensureLoggedIn", function () {
  test("works", function () {
    expect.assertions(1);
    const req: any ={};
    const res: any ={ locals: { user: { username: "test", is_admin: false } } };
    const next = function (err: any) {
      expect(err).toBeFalsy();
    };
    ensureLoggedIn(req, res, next);
  });

  test("unauth if no login", function () {
    expect.assertions(1);
    const req: any ={};
    const res: any ={ locals: {} };
    const next = function (err: any) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureLoggedIn(req, res, next);
  });
});

describe("ensureCorrectUser", function () {
  test("works: admin", function () {
    expect.assertions(1);
    const req: any ={ params: { username: "test" } };
    const res: any ={ locals: { user: { username: "admin", isAdmin: true } } };
    const next = function (err: any) {
      expect(err).toBeFalsy();
    };
    ensureCorrectUser(req, res, next);
  });

  test("works: same user", function () {
    expect.assertions(1);
    const req: any ={ params: { username: "test" } };
    const res: any ={ locals: { user: { username: "test", isAdmin: false } } };
    const next = function (err: any) {
      expect(err).toBeFalsy();
    };
    ensureCorrectUser(req, res, next);
  });

  test("unauth: mismatch", function () {
    expect.assertions(1);
    const req: any ={ params: { username: "wrong" } };
    const res: any ={ locals: { user: { username: "test", isAdmin: false } } };
    const next = function (err: any) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureCorrectUser(req, res, next);
  });

  test("unauth: if anon", function () {
    expect.assertions(1);
    const req: any ={ params: { username: "test" } };
    const res: any ={ locals: {} };
    const next = function (err: any) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureCorrectUser(req, res, next);
  });

  describe("checkVerifyToken", function () {
    test("accepts proper token", function (){
      const req: any = {};
    const res: any ={};
    const next = function(err: any){
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
      checkVerifyToken(req, res, next)
    });
    test("rejects expired token");
    test("rejects token with missing fields")
    test("rejects token with unrecognized fields")
    //Check for proper locals.
  })
});