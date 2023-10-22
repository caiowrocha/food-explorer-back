const OrdersRepository = require("../repositories/OrdersRepository");
const OrdersManipulateService = require("../services/OrdersManipulateService");
const UsersRepository = require("../repositories/UserRepository");

const usersRepository = new UsersRepository();
const ordersRepository = new OrdersRepository();
const ordersManipulateService = new OrdersManipulateService(ordersRepository);

class OrdersController {
  async create(request, response) {
    const { orderStatus, totalValue, paymentMethod, cartGoods } = request.body;

    const user_id = request.user.id;

    const order_id = await ordersManipulateService.create({
      orderStatus,
      totalValue,
      paymentMethod,
      cartGoods,
      user_id,
    });

    return response.status(201).json(order_id);
  }

  async update(request, response) {
    const { id, orderStatus } = request.body;

    await ordersManipulateService.update({ orderStatus, id });

    return response.status(201).json();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const user = await usersRepository.findById(user_id);

    const orders = await ordersManipulateService.index({ user });

    return response.status(200).json(orders);
  }
}

module.exports = OrdersController;
