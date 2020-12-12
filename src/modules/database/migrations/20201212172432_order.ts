import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('Order', table => {
      table
        .increments('id')
        .notNullable()
        .primary();
      table.enum('status', ['created', 'analyzing', 'done', 'canceled']).notNullable();
      table.specificType('total', 'double precision').notNullable();
      table.dateTime('createdDate').notNullable();
      table.dateTime('updatedDate').notNullable();
    })
    .createTable('Order_Product', table => {
      table
        .increments('id')
        .notNullable()
        .primary();
      table.integer('orderId').references('Order.id');
      table.integer('productId').references('Product.id');
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('Order').dropTable('Order_Product');
}
