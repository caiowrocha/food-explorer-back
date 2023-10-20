const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../config/upload");

const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuth");
const ensureIsAdmin = require("../middlewares/ensureAdmin");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);
const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", upload.single("image"), dishesController.create);

module.exports = dishesRoutes;
;
