import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { Order } from 'modules/database/models/order';

import { OrderService } from '../services/order';
import { ListValidator } from '../validators/order/list';
import { SaveValidator } from '../validators/order/save';

@ApiTags('Admin: Order')
@Controller('/order')
@AuthRequired()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() model: ListValidator) {
    return this.orderService.list(model);
  }

  @Get(':orderId')
  @ApiResponse({ status: 200, type: Order })
  public async details(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.findById(orderId);
  }

  @Patch(':orderId/cancel')
  @ApiResponse({ status: 200, type: Order })
  public async cancel(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.cancel(orderId);
  }

  @Post()
  @ApiResponse({ status: 200, type: Order })
  public async save(@Body() model: SaveValidator) {
    return this.orderService.save(model);
  }
}
