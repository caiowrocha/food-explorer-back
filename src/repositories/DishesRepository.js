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

  async delete(id) {
    await knex("dishes").where({ id }).delete();
  }

  async update({ newDishInfo }, dish_id) {
    await knex("dishes").update(newDishInfo).where({ id: dish_id });
  }

  async selectJoin({ title, filteredIngredients }) {
    const dishes = await knex("ingredients")
      .select([
        "dishes.id",
        "dishes.title",
        "dishes.description",
        "dishes.category",
        "dishes.price",
        "dishes.image",
      ])
      .whereLike("dishes.title", `%${title}%`)
      .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
      .groupBy("dishes.id")
      .orderBy("dishes.title");

    return dishes;
  }

  async select(title) {
    const dishes = await knex("dishes")
      .whereLike("title", `%${title}%`)
      .orderBy("title");

    return dishes;
  }

  async addIngredients(ingredients) {
    await knex("ingredients").insert(ingredients);
  }

  async deleteIngredient(dish_id) {
    await knex("ingredients").where({ dish_id }).delete();
  }

  async updateIngredients(ingredientsInfo, dish_id) {
    await this.deleteIngredient(dish_id);
    await knex("ingredients").insert(ingredientsInfo);
  }

  async findIngredientsById(dish_id) {
    const ingredients = await knex("ingredients")
      .where({ dish_id })
      .orderBy("title");
    return ingredients;
  }

  async grabAllIngredients() {
    const ingredients = await knex("ingredients");
    return ingredients;
  }
}

module.exports = DishesRepository;
