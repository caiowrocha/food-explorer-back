const AppError = require("../utils/AppError");

class DishesManipulateService {
  dishesRepository;
  diskStorage;

  constructor(dishesRepository, diskStorage) {
    this.dishesRepository = dishesRepository;
    this.diskStorage = diskStorage;
  }

  async create({
    title,
    description,
    category,
    price,
    ingredients,
    image = null,
  }) {
    const checkDishExists = await this.dishesRepository.findByTitle(title);

    if (checkDishExists) {
      throw new AppError("Este prato já está presente no cardápio");
    }

    let dishImage = null;

    if (image) {
      dishImage = await this.diskStorage.saveFile(image);
    }

    const dish_id = await this.dishesRepository.create({
      title,
      description,
      category,
      price,
      image: dishImage,
    });

    const id = dish_id[0];

    let ingredientsInsert;
    if (typeof ingredients === "string") {
      ingredientsInsert = {
        title: ingredients,
        dish_id: id,
      };
    } else if (ingredients.length > 1) {
      ingredientsInsert = ingredients.map((title) => {
        return {
          title,
          dish_id: id,
        };
      });
    }

    await this.dishesRepository.addIngredients(ingredientsInsert);
  }

  async update({
    title,
    description,
    category,
    price,
    ingredients,
    id,
    image = null,
  }) {
    const { id: dish_id } = id;

    const dish = await this.dishesRepository.findById(dish_id);

    if (!dish) {
      throw new AppError("Esse prato não existe no cardápio");
    }

    const newDishInfo = {
      title: dish.title,
      description: dish.description,
      category: dish.category,
      price: dish.price,
    };

    newDishInfo.title = title ?? newDishInfo.title;
    newDishInfo.category = category ?? newDishInfo.category;
    newDishInfo.price = price ?? newDishInfo.price;
    newDishInfo.description = description ?? newDishInfo.description;

    await this.dishesRepository.updateDish({ newDishInfo }, dish_id);

    if (ingredients) {
      let ingredientsInsert;
      if (typeof ingredients === "string") {
        ingredientsInsert = {
          name: ingredients,
          dish_id,
        };
      } else if (ingredients.length > 1) {
        ingredientsInsert = ingredients.map((title) => {
          return {
            title,
            dish_id,
          };
        });
      }
      await this.dishesRepository.updateIngredients(ingredientsInsert, dish_id);
    }
  }

  async show(dish_id) {
    const dish = await this.dishesRepository.findById(dish_id);
    const ingredients = await this.dishesRepository.findIngredientsById(
      dish_id
    );

    return {
      ...ingredients,
      dish,
    };
  }
}

module.exports = DishesManipulateService;
