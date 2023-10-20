const AppError = require("../utils/AppError");

class DishesManipulateService {
  dishesRepository;
  diskStorage;

  constructor(dishesRepository, diskStorage) {
    this.dishesRepository = dishesRepository;
    this.diskStorage = diskStorage;
  }

  async create({ title, description, category, price, ingredients }) {
    const checkDishExists = await this.dishesRepository.findByTitle(title);

    if (checkDishExists) {
      throw new AppError("Este prato já está presente no cardápio");
    }

    // const fileName = await this.diskStorage.saveFile(image);

    const dish_id = await this.dishesRepository.create({
      title,
      description,
      category,
      price,
      // image: fileName,
    });

    const id = dish_id[0];

    let ingredientsInsert;
    if (typeof ingredients === "string") {
      ingredientsInsert = {
        title: ingredients,
        dish_id: id
      };
    } else if (ingredients.length > 1) {
      ingredientsInsert = ingredients.map((title) => {
        return {
          title,
          dish_id: id
        };
      });
    }

    await this.dishesRepository.addIngredients(ingredientsInsert);
  }
}

module.exports = DishesManipulateService;
