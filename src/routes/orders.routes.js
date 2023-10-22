const { Router } = require("express");
const OrdersController = require("../controllers/OrdersController");

const ordersController = new OrdersController();
const ensureAuth = require("../middlewares/ensureAuth");
const ensureAdmin = require("../middlewares/ensureAdmin");

const ordersRoutes = Router();

ordersRoutes.use(ensureAuth);

ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/", ordersController.index);
ordersRoutes.put("/", ensureAdmin, ordersController.update);

module.exports = ordersRoutes;
