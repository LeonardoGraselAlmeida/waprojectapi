import * as faker from 'faker/locale/pt_BR';
import * as Knex from 'knex';
import { IProduct } from 'modules/database/interfaces/product';
import { IS_DEV } from 'settings';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  const listProducts = await knex.select().from('Product');

  if (listProducts.length != 0) return;

  for (let x = 0; x < 10; x++) {
    const product: IProduct = {
      description: faker.commerce.product(),
      amount: parseInt(faker.finance.amount(1)),
      price: Number(faker.commerce.price(1)),
      createdDate: new Date(),
      updatedDate: new Date()
    };
    await knex.insert(product).into('Product');
  }
}
