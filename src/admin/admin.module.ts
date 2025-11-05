import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminProductsController } from './admin.products.controller';
import {AdminCategoriesController} from './admin.categories.controller';

@Module({
  controllers: [AdminController, AdminProductsController, AdminCategoriesController],
})
export class AdminModule {}
