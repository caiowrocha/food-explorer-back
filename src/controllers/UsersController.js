const knex = require("../database/knex");
const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");
const UserUpdateService = require("../services/UserUpdateService");

const userRepository = new UserRepository();
const userCreateService = new UserCreateService(userRepository);
const userUpdateService = new UserUpdateService(userRepository);

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    await userCreateService.execute({
      name,
      email,
      password,
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;

    const user_id = request.user.id;

    await userUpdateService.execute({
      name,
      email,
      password,
      old_password,
      user_id,
    });

    return response.json();
  }
}

module.exports = UsersController;
