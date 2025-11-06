import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminProductsController } from './admin.products.controller';
import {AdminCategoriesController} from './admin.categories.controller';
import {AdminUsersController} from './admin.users.controller';
import {AdminOrdersController} from './admin.orders.controller';

@Module({
  controllers: [AdminController, AdminProductsController, AdminCategoriesController, AdminUsersController, AdminOrdersController],
})
export class AdminModule {}
