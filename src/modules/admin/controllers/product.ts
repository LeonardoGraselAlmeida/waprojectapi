import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { Product } from 'modules/database/models/product';

import { ProductService } from '../services/product';
import { ListValidator } from '../validators/product/list';
import { SaveValidator } from '../validators/product/save';

@ApiTags('Admin: Product')
@Controller('/product')
@AuthRequired()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Product] })
  public async list(@Query() model: ListValidator) {
    return this.productService.list(model);
  }

  @Get(':productId')
  @ApiResponse({ status: 200, type: Product })
  public async details(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.findById(productId);
  }

  @Delete(':productId')
  public async delete(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.remove(productId);
  }

  @Post()
  @ApiResponse({ status: 200, type: Product })
  public async save(@Body() model: SaveValidator) {
    return this.productService.save(model);
  }
}
