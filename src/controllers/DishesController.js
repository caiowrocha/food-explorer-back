const DiskStorage = require("../providers/DiskStorage");
const DishesManipulateService = require("../services/DishesManipulateService");
const DishesRepository = require("../repositories/DishesRepository");

const diskStorage = new DiskStorage();
const dishesRepository = new DishesRepository();
const dishesManipulateService = new DishesManipulateService(
  dishesRepository,
  diskStorage
);

class DishesController {
  async create(request, response) {
    const { title, description, category, price, ingredients } = request.body;

    const dishImage = request.file.filename;

    await dishesManipulateService.create({
      title,
      description,
      category,
      price,
      ingredients,
      image: dishImage,
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { title, description, category, price, ingredients } = request.body;

    const id = request.params;

    const dishImage = request.file.filename;

    await dishesManipulateService.update({
      title,
      description,
      category,
      price,
      ingredients,
      id,
      image: dishImage,
    });

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await dishesManipulateService.show(id);

    return response.status(200).json({
      dish,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await dishesManipulateService.delete(id);

    return response.status(202).json();
  }

  async index(request, response) {
    const { title, ingredients } = request.query;

    const dishes = await dishesManipulateService.index({ title, ingredients });

    return response.status(200).json(dishes);
  }
}

module.exports = DishesController;
