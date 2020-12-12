import { Injectable, NotFoundException } from '@nestjs/common';
import { IProduct } from 'modules/database/interfaces/product';
import { Product } from 'modules/database/models/product';
import { Page } from 'objection';

import { ProductRepository } from '../repositories/product';
import { ListValidator } from '../validators/product/list';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  public async list(model: ListValidator): Promise<Page<Product>> {
    const list = await this.productRepository.list(model);
    return list;
  }

  public async findById(productId: number): Promise<Product> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('not-found');
    }

    return product;
  }

  public async save(model: IProduct): Promise<Product> {
    if (model.id) return this.update(model);
    return this.create(model);
  }

  public async remove(productId: number): Promise<void> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('not-found');
    }

    return this.productRepository.remove(productId);
  }

  private async create(model: IProduct): Promise<Product> {
    const product = await this.productRepository.insert(model);
    return product;
  }

  private async update(model: IProduct): Promise<Product> {
    const product = await this.productRepository.findById(model.id);

    if (!product) throw new NotFoundException('not-found');
    return this.productRepository.update({ ...product, ...model });
  }
}
