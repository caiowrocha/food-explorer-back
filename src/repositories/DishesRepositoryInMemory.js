class DishesRepositoryInMemory {
  dishes = [];

  async findByTitle(title) {
    const dish = this.dishes.find((dish) => dish.title === title);
    return dish;
  }

  async findById(dish_id) {
    const dish = this.dishes.find((dish) => dish.id === dish_id);
    return dish;
  }

  async create({ title, description, category, price, image, ingredients }) {
    const dish = {
      id: Math.floor(Math.random() * 1000) + 1,
      title,
      description,
      category,
      price,
      image,
      ingredients,
    };

    this.dishes.push(dish);

    return dish;
  }
}

module.exports = DishesRepositoryInMemory;
