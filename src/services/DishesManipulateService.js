const AppError = require("../utils/AppError");

class DishesManipulateService {
  dishesRepository;
  diskStorage;

  constructor(dishesRepository, diskStorage) {
    this.dishesRepository = dishesRepository;
    this.diskStorage = diskStorage;
  }

  async create({ title, description, category, price, ingredients, image }) {
    const checkDishExists = await this.dishesRepository.findByTitle(title);

    if (checkDishExists) {
      throw new AppError("Este prato já está presente no cardápio");
    }

    const fileName = await this.diskStorage.saveFile(image);

    const dish_id = await this.dishesRepository.create({
      title,
      description,
      category,
      price,
      image: fileName,
    });

    let ingredientsInsert;
    if (typeof ingredients === "string") {
      ingredientsInsert = {
        title: ingredients,
        dish_id,
      };
    } else if (ingredients.length) {
      ingredientsInsert = ingredients.map((title) => {
        return {
          title,
          dish_id,
        };
      });
    }
    await this.dishesRepository.addIngredients(ingredientsInsert);
  }
}

module.exports = DishesManipulateService;
