const SessionRepositoryInMemory = require("../repositories/SessionRepositoryInMemory");
const AppError = require("../utils/AppError");
const SessionManipulateService = require("./SessionManipulateService");

describe("SessionManipulateService", () => {
  let sessionRepositoryInMemory = null;
  let sessionManipulateService = null;

  beforeEach(async () => {
    sessionRepositoryInMemory = new SessionRepositoryInMemory();
    await sessionRepositoryInMemory.initialize();
    sessionManipulateService = new SessionManipulateService(
      sessionRepositoryInMemory
    );
  });

  it("Session should be created", async () => {
    const session = {
      email: "test@email.com",
      password: "123",
    };
    const sessionCreated = await sessionManipulateService.create(session);
    expect(sessionCreated).toHaveProperty("id");
  });

  it("Session should not be created", async () => {
    const session = {
      email: "testxxx@ddddasdaemail.com",
      password: "333333",
    };

    await expect(sessionManipulateService.create(session)).rejects.toEqual(
      new AppError("E-mail e/ou senha incorreta", 401)
    );
  });
});
