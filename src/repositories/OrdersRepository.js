const knex = require("../database/knex");

class OrdersRepository {
  async create({ orderStatus, totalValue, paymentMethod, user_id }) {
    const order_id = await knex("orders").insert({
      orderStatus,
      totalValue,
      paymentMethod,
      user_id,
    });
    return order_id;
  }

  async createGoods(goods) {
    await knex("ordersGoods").insert(goods);
  }

  async grabAllGoods() {
    const goods = await knex("ordersGoods");

    return goods;
  }

  async update({ orderStatus, id }) {
    await knex("orders").update({ orderStatus }).where({ id });
  }

  async select({ user_id }) {
    if (user_id) {
      const orders = await knex("ordersGoods")
        .where({ user_id })
        .select([
          "orders.id",
          "orders.user_id",
          "orders.orderStatus",
          "orders.totalValue",
          "orders.paymentMethod",
          "orders.created_at",
        ])
        .innerJoin("orders", "orders.id", "ordersGoods.order_id")
        .groupBy("orders.id");

      return orders;
    } else {
      const orders = await knex("ordersGoods")
        .select([
          "orders.id",
          "orders.user_id",
          "orders.orderStatus",
          "orders.totalValue",
          "orders.paymentMethod",
          "orders.created_at",
        ])

        .innerJoin("orders", "orders.id", "ordersGoods.order_id")
        .groupBy("orders.id");

      return orders;
    }
  }
}

module.exports = OrdersRepository;
