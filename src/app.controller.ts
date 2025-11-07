import { Controller, Get, Render } from '@nestjs/common';
import {CategoriesService} from './models/categories.service';

@Controller()
export class AppController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  @Render('index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Головна Сторінка - Soft Market';
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
    return {
      viewData: viewData,
    };
  }
}
