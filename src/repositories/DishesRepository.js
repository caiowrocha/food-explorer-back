const knex = require("../database/knex");

class DishesRepository {
  async findByTitle(title) {
    const dish = await knex("dishes").where({ title }).first();
    return dish;
  }

  async findById(dish_id) {
    const dish = await knex("dishes").where({ id: dish_id }).first();
    return dish;
  }

  async create({ title, description, category, price }) {
    const dish_id = await knex("dishes").insert({
      title,
      description,
      category,
      price,
    });

    return dish_id;
  }

  async addIngredients(ingredients) {
    await knex("ingredients").insert(ingredients);
  }
}

module.exports = DishesRepository;
