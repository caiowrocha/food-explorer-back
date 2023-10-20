const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/UserRepository");

const userRepository = new UserRepository();

async function ensureAdmin(request, response, next) {
  const user_id = request.user.id;

  const user = userRepository.findById(user_id);

  if (!user.isAdmin) {
    throw new AppError("Usuário não autorizado, acesso negado.", 401);
  }
  next();
}

module.exports = ensureAdmin;
