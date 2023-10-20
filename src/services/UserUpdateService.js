const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

const knex = require("../database/knex");

class UserUpdateService {
  userRepository;

  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password, old_password, user_id }) {
    const user = await this.userRepository.findById(user_id);

    const newUserInfo = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const checkEmailAlreadyTaken = await this.userRepository.findByEmail(email);

    if (checkEmailAlreadyTaken && checkEmailAlreadyTaken.id !== user.id) {
      throw new AppError("E-mail já está em uso");
    }

    newUserInfo.name = name ?? newUserInfo.name;
    newUserInfo.email = email ?? newUserInfo.email;

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para poder definir a nova"
      );
    }

    if (password && old_password) {
      const passwordMatch = await compare(old_password, user.password);

      if (!passwordMatch) {
        throw new AppError("A senha antiga não confere");
      }
      newUserInfo.password = await hash(password, 8);
    }

    await knex("users").update(newUserInfo).where({ id: user_id });
  }
}

module.exports = UserUpdateService;
