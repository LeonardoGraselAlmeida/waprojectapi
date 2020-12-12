import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { OrderController } from './controllers/order';
import { ProductController } from './controllers/product';
import { TestController } from './controllers/test';
import { UserController } from './controllers/user';
import { RenewTokenMiddleware } from './middlewares/renewToken';
import { OrderRepository } from './repositories/order';
import { ProductRepository } from './repositories/product';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { OrderService } from './services/order';
import { ProductService } from './services/product';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, UserController, TestController, ProductController, OrderController],
  providers: [
    AuthService,
    UserRepository,
    UserService,
    ProductService,
    ProductRepository,
    OrderService,
    OrderRepository
  ]
})
export class AdminModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RenewTokenMiddleware).forRoutes('*');
  }
}
