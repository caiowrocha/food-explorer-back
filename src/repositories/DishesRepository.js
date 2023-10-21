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

  async create({ title, description, category, price, image }) {
    const dish_id = await knex("dishes").insert({
      title,
      description,
      category,
      price,
      image,
    });

    return dish_id;
  }

  async addIngredients(ingredients) {
    await knex("ingredients").insert(ingredients);
  }

  async updateDish({ newDishInfo }, dish_id) {
    await knex("dishes").update(newDishInfo).where({ id: dish_id });
  }

  async deleteIngredient(dish_id) {
    await knex("ingredients").where({ dish_id }).delete();
  }

  async updateIngredients(ingredientsInfo, dish_id) {
    await knex("ingredients").where({ dish_id }).delete();
    await knex("ingredients").insert(ingredientsInfo);
  }

  async findIngredientsById(dish_id) {
    const ingredients = await knex("ingredients")
      .where({ dish_id })
      .orderBy("title");
    return ingredients;
  }
}

module.exports = DishesRepository;
