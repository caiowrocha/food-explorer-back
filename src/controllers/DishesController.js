const DishesManipulateService = require("../services/DishesManipulateService");
const DishesRepository = require("../repositories/DishesRepository");

const dishesRepository = new DishesRepository();
const dishesManipulateService = new DishesManipulateService(dishesRepository);

class DishesController {
  async create(request, response) {
    const { title, description, category, price, ingredients } = request.body;

    // const dishImage = request.file.filename;

    await dishesManipulateService.create({
      title,
      description,
      category,
      price,
      ingredients,
      // image: dishImage,
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { title, description, category, price, ingredients } = request.body;

    const id = request.params;

    // const dishImage = request.file.filename;

    await dishesManipulateService.update({
      title,
      description,
      category,
      price,
      ingredients,
      id,
    });

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const { dish, ...ingredients } = await dishesManipulateService.show(id);

    return response.status(200).json({
      dish,
      ...ingredients,
    });
  }
}

module.exports = DishesController;
