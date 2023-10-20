const authConfig = require("../config/auth");
const { sign } = require("jsonwebtoken");
const SessionCreateService = require("../services/SessionCreateService");
const UserRepository = require("../repositories/UserRepository");
const userRepository = new UserRepository();
const sessionCreateService = new SessionCreateService(userRepository);

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await sessionCreateService.execute({ email, password });

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.json({ user, token });
  }
}

module.exports = SessionsController;
