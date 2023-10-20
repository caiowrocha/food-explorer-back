const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");

class SessionCreateService {
  userRepository;
  sessionRepository;

  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    return user;
  }
}

module.exports = SessionCreateService;
