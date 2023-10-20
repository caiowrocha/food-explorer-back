const { Router } = require("express");
const ensureAuth = require("../middlewares/ensureAuth");
const UserController = require("../controllers/UsersController");
const userController = new UserController();

const usersRoutes = Router();
usersRoutes.post("/", userController.create);
usersRoutes.put("/", ensureAuth, userController.update);

module.exports = usersRoutes;
