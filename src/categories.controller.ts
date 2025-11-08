import { Controller, Get, Render, Param, Res } from '@nestjs/common';
import { ProductsService } from './models/products.service';
import {CategoriesService} from './models/categories.service';

@Controller('/categories')
export class CategoriesController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService
  ) {}

  @Get('/')
  @Render('categories/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Продукти - Soft Market';
    viewData['subtitle'] = 'Всі продукти';
    viewData['products'] = await this.productsService.findAll();
    viewData['categories'] = await this.categoriesService.findAll();
    viewData['breadcrumbs'] = [
      { name: 'Всі продукти', link: '/categories' }
    ];
    return {
      viewData: viewData,
    };
  }

  @Get('/:id')
  async show(@Param() params, @Res() response) {
    const category = await this.categoriesService.findOne(params.id);
    if (category === undefined) {
      return response.redirect('/categories');
    }
    const viewData = [];
    viewData['title'] = category.getName() + ' - Soft Market';
    viewData['subtitle'] = category.getName();
    viewData['category'] = category;
    viewData['products'] = category.products;
    viewData['categories'] = await this.categoriesService.findAll();
    viewData['breadcrumbs'] = [
      { name: category.getName(), link: `/categories/${category.getId()}` },
    ];

    return response.render('categories/index', { viewData: viewData });
  }
}
