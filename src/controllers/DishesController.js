const DishesManipulateService = require("../services/DishesManipulateService");
const DishesRepository = require("../repositories/DishesRepository");

const dishesRepository = new DishesRepository();
const dishesManipulateService = new DishesManipulateService(dishesRepository);

class DishesController {
  async create(request, response) {
    const { title, description, category, price, ingredients } = request.body;

    const image = request.file.filename;

    await dishesManipulateService.create({
      title,
      description,
      category,
      price,
      ingredients,
      image,
    });

    return response.status(201).json();
  }
}

module.exports = DishesController;
