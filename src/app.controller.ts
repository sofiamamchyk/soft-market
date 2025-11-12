import { Controller, Get, Query, Render } from '@nestjs/common';
import {CategoriesService} from './models/categories.service';
import {ProductsService} from './models/products.service';

@Controller()
export class AppController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  @Get('/')
  @Render('index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Головна - Soft Market';
    viewData['categories'] = await this.categoriesService.findAll();
    return {
      viewData: viewData,
    };
  }

  @Get('/about')
  @Render('about')
  about() {
    const viewData = [];
    viewData['title'] = 'Про нас - Soft Market';
    viewData['subtitle'] = 'Про нас';
    viewData['breadcrumbs'] = [
      { name: 'Про нас', link: '/about' },
    ];

    return {
      viewData: viewData,
    };
  }


  @Get('/search')
  @Render('search')
  async search(@Query() query) {
    const products = await this.productsService.search(query.value);
    const viewData = [];
    viewData['title'] = 'Пошук - Soft Market';
    viewData['subtitle'] = `Результати пошуку "${query.value}"`;
    viewData['search'] = query.value;
    viewData['products'] = products;
    viewData['productsCount'] = products.length;
    viewData['breadcrumbs'] = [
      { name: 'Пошук' }
    ];
    return {
      viewData: viewData,
    };
  }

  @Get('/autocomplete')
  async autocomplete(@Query() query) {
    if (!query.value) {
        return {
          success: true,
          products: []
        };
    }
    const products = await this.productsService.search(query.value);
    return {
      success: true,
      products
    };
  }
}
