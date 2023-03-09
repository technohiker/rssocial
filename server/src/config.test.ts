describe("config can come from env", function () {
  test("works", function () {
    process.env.SECRET_KEY = "abc";
    process.env.PORT = "5000";
    process.env.DATABASE_URL = "other";
    process.env.NODE_ENV = "other";

    const config = require("./config");
    expect(config.SECRET_KEY).toEqual("abc");
    expect(config.PORT).toEqual(5000);
    expect(config.getDatabaseUri()).toEqual("other");
    expect(config.BCRYPT_WORK_FACTOR).toEqual(14);

    delete process.env.SECRET_KEY;
    delete process.env.PORT;
    delete process.env.BCRYPT_WORK_FACTOR;
    delete process.env.DATABASE_URL;

    let dbURI = config.getDatabaseUri()

    expect(dbURI.substring(dbURI.length - 10, dbURI.length)).toEqual("capstone_2");
    process.env.NODE_ENV = "test";

    expect(dbURI.substring(dbURI.length - 15, dbURI.length)).toEqual("capstone_2_test");
  });
})

export { }