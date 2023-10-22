class OrdersManipulateService {
  ordersRepository;
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async create({ orderStatus, totalValue, paymentMethod, cartGoods, user_id }) {
    const order_id = await this.ordersRepository.create({
      orderStatus,
      totalValue,
      paymentMethod,
      user_id,
    });

    const [id] = order_id;

    const goodsInsert = cartGoods.map((good) => {
      return {
        dish_id: good.dish_id,
        order_id: id,
        amount: good.amount,
        title: good.title,
      };
    });

    await this.ordersRepository.createGoods(goodsInsert);

    return order_id;
  }

  async update({ orderStatus, id }) {
    await this.ordersRepository.update({ orderStatus, id });
  }

  async index({ user }) {
    if (!user.isAdmin) {
      const orders = await this.ordersRepository.select(user.id);

      const ordersGoods = await this.ordersRepository.grabAllGoods();

      const ordersWithGoods = orders.map((order) => {
        const orderGood = ordersGoods.filter(
          (good) => good.order_id === order.id
        );

        return {
          goods: orderGood,
          ...order,
        };
      });

      return ordersWithGoods;
    } else {
      const orders = await this.ordersRepository.select();

      const ordersGoods = await this.ordersRepository.grabAllGoods();

      const ordersWithGoods = orders.map((order) => {
        const orderGood = ordersGoods.filter(
          (good) => good.order_id === order.id
        );

        return {
          goods: orderGood,
          ...order,
        };
      });
      return ordersWithGoods;
    }
  }
}

module.exports = OrdersManipulateService;
