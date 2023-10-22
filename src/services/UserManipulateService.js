const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserManipulateService {
  userRepository;

  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create({ name, email, password, isAdmin }) {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso");
    }
    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    return userCreated;
  }

  async update({ name, email, password, old_password, user_id }) {
    const user = await this.userRepository.findById(user_id);

    const newUserInfo = {
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
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

    await this.userRepository.update({ newUserInfo }, user_id);
  }
}

module.exports = UserManipulateService;
