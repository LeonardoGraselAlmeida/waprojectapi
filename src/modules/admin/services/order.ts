import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { Page } from 'objection';

import { OrderRepository } from '../repositories/order';
import { ListValidator } from '../validators/order/list';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  public async list(model: ListValidator): Promise<Page<Order>> {
    const list = await this.orderRepository.list(model);
    return list;
  }

  public async findById(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException('not-found');
    }

    return order;
  }

  public async save(model: IOrder): Promise<Order> {
    if (model.id) return this.update(model);
    return this.create(model);
  }

  private async create(model: IOrder): Promise<Order> {
    const order = await this.orderRepository.insert(model);
    return order;
  }

  private async update(model: IOrder): Promise<Order> {
    const order = await this.orderRepository.findById(model.id);

    if (!order) throw new NotFoundException('not-found');
    return this.orderRepository.update({ ...order, ...model });
  }
}
