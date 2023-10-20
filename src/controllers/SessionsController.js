const authConfig = require("../config/auth");
const { sign } = require("jsonwebtoken");
const SessionManipulateService = require("../services/SessionManipulateService");
const UserRepository = require("../repositories/UserRepository");
const userRepository = new UserRepository();
const sessionManipulateService = new SessionManipulateService(userRepository);

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await sessionManipulateService.create({ email, password });

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.json({ user, token });
  }
}

module.exports = SessionsController;
