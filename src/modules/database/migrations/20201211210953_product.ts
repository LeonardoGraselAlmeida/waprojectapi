import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Product', table => {
    table.increments('id').primary();
    table.string('description', 50).notNullable();
    table.integer('amount').nullable();
    table.specificType('price', 'double precision').nullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('Product');
}
