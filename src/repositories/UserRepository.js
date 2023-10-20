const knex = require("../database/knex");

class UserRepository {
  async findByEmail(email) {
    const user = await knex("users").where({ email }).first();
    return user;
  }

  async create({ name, email, password }) {
    const user_id = await knex("users").insert({ name, email, password });
    return { id: user_id };
  }

  async findById(user_id) {
    const user = await knex("users").where({ id: user_id }).first();
    return user;
  }
}

module.exports = UserRepository;
