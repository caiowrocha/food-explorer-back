const UserRepository = require("../repositories/UserRepository");
const UserManipulateService = require("../services/UserManipulateService");

const userRepository = new UserRepository();
const userManipulateService = new UserManipulateService(userRepository);

class UsersController {
  async create(request, response) {
    const { name, email, password, isAdmin } = request.body;

    await userManipulateService.create({
      name,
      email,
      password,
      isAdmin,
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;

    const user_id = request.user.id;

    await userManipulateService.update({
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
