import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { listStatus, IOrder, enStatus } from 'modules/database/interfaces/order';
import { IProduct } from 'modules/database/interfaces/product';
import { Product } from 'modules/database/models/product';

export class SaveValidator implements IOrder {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ required: true, type: 'integer' })
  public total: number;

  @IsNotEmpty()
  @ApiProperty({ required: true, enum: listStatus(), isArray: false })
  public status: enStatus;

  @IsNotEmpty()
  @ApiProperty({ required: true, type: [Product] })
  public products: IProduct[];
}
