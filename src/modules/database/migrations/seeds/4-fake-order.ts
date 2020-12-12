import * as Knex from 'knex';
import { IOrder } from 'modules/database/interfaces/order';
import { IProduct } from 'modules/database/interfaces/product';
import { IS_DEV } from 'settings';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  const listProducts = await knex.select().from('Product');
  const listOrders = await knex.select().from('Order');

  if (listProducts.length == 0 || listOrders.length != 0) return;

  for (let x = 0; x < 10; x++) {
    const products: IProduct[] = [];
    for (let y = 0; y < x + 1; y++) {
      products.push(listProducts[y]);
    }
    const order: IOrder = {
      total: products.reduce((accumulator, product) => accumulator + product.price, 0),
      status: 'created' as any,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    const [orderId] = await knex
      .insert(order)
      .into('Order')
      .returning('id');

    products.forEach(async product => {
      const orderProduct = {
        orderId,
        productId: product.id
      };

      await knex.insert(orderProduct).into('Order_Product');
    });
  }
}
