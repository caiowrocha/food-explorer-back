exports.up = (knex) =>
  knex.schema.createTable("dishes", (table) => {
    table.increments("id").primary();
    table.text("title");
    table.text("description");
    table.text("category");
    table.text("price");
    table.varchar("image").default("null");
  });

exports.down = (knex) => knex.schema.dropTable("dishes");
