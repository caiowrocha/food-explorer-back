const UserManipulateService = require("./UserManipulateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateRepository", () => {
  let userRepositoryInMemory = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userManipulateService = new UserManipulateService(userRepositoryInMemory);
  });

  it("User should be created", async () => {
    const user = {
      name: "Test Name",
      email: "test@email.com",
      password: "123",
    };
    const userCreated = await userManipulateService.create(user);

    expect(userCreated).toHaveProperty("id");
  });

  it("User should not be created with an already existing E-mail", async () => {
    const user1 = {
      name: "Test User 1",
      email: "user@test.com",
      password: "123",
    };

    const user2 = {
      name: "Test User 2",
      email: "user@test.com",
      password: "456",
    };
    await userManipulateService.create(user1);
    await expect(userManipulateService.create(user2)).rejects.toEqual(
      new AppError("Este e-mail já está em uso")
    );
  });
});
