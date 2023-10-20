const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateRepository", () => {
  let userRepositoryInMemory = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });

  it("User should be created", async () => {
    const user = {
      name: "Test Name",
      email: "test@email.com",
      password: "123",
    };
    const userCreated = await userCreateService.execute(user);

    expect(userCreated).toHaveProperty("id");
  });
});
