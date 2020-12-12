import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { enStatus, IOrder } from '../interfaces/order';
import { Product } from './product';

export class Order extends Model implements IOrder {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'string' })
  public status: enStatus;
  @ApiProperty({ type: [Product] })
  public products: Product[];
  @ApiProperty({ type: 'number' })
  public total: number;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'Order';
  }

  public static get relationMappings(): any {
    return {
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: 'Order.id',
          through: {
            from: 'Order_Product.orderId',
            to: 'Order_Product.productId'
          },
          to: 'Product.id'
        }
      }
    };
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }
  public $formatDatabaseJson(json: any): any {
    json = Model.prototype.$formatDatabaseJson.call(this, json);
    return json;
  }

  public $parseDatabaseJson(json: any): any {
    return Model.prototype.$formatDatabaseJson.call(this, json);
  }

  public $formatJson(data: IOrder): IOrder {
    return data;
  }
}
