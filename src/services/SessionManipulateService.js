const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");

class SessionManipulateService {
  sessionRepository;
  constructor(sessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async create({ email, password }) {
    const user = await this.sessionRepository.findByEmail(email);

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

module.exports = SessionManipulateService;
