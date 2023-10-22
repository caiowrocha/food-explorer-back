exports.up = (knex) =>
  knex.schema.createTable("ordersGoods", (table) => {
    table.increments("id").primary();

    table
      .integer("order_id")
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");
    table
      .integer("dish_id")
      .references("id")
      .inTable("dishes")
      .onDelete("CASCADE");

    table.integer("amount");
    table.text("title");
    table.timestamp("created_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("ordersGoods");
