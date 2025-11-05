import { Controller, Get, Render, Post, Body, Redirect,
  UseInterceptors, UploadedFile, Param, Req, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Category } from '../models/category.entity';
import { ProductValidator } from '../validators/product.validator';
import * as fs from 'fs';
import { CategoriesService } from '../models/categories.service';

@Controller('/admin/categories')
export class AdminCategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  @Render('admin/categories/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Категорії - Адмін панель - Soft Market';
    viewData['categories'] = await this.categoriesService.findAll();
    return {
      viewData: viewData,
    };
  }
  
  @Post('/store')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  @Redirect('/admin/categories')
  async store(@Body() body, @UploadedFile() file: Express.Multer.File,
    @Req() request,
  ) {
    const toValidate: string[] = ['name', 'imageCreate'];
    const errors: string[] = ProductValidator.validate(body, file, toValidate);
    if (errors.length > 0) {
      if (file) {
        fs.unlinkSync(file.path);
      }
      request.session.flashErrors = errors;
    } else {
      const newCategory = new Category();
      newCategory.setName(body.name);
      newCategory.setImage(file.filename);
      await this.categoriesService.createOrUpdate(newCategory);
    }
  }

  @Post('/:id')
  @Redirect('/admin/categories')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }

  @Get('/:id')
  @Render('admin/categories/edit')
  async edit(@Param('id') id: string) {
    const viewData = [];
    viewData['title'] = 'Редагувати Категорію - Адмін панель - Soft Market';
    viewData['category'] = await this.categoriesService.findOne(id);
    return {
      viewData: viewData,
    };
  }

  @Post('/:id/update')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  async update(
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Req() request,
    @Res() response,
  ) {
    const toValidate: string[] = ['name', 'imageUpdate'];
    const errors: string[] = ProductValidator.validate(body, file, toValidate);
    if (errors.length > 0) {
      if (file) {
        fs.unlinkSync(file.path);
      }
      request.session.flashErrors = errors;
      return response.redirect('/admin/categories/'+id);
    } else {
      const product = await this.categoriesService.findOne(id);
      product.setName(body.name);
      if (file) {
        product.setImage(file.filename);
      }
      await this.categoriesService.createOrUpdate(product);
      return response.redirect('/admin/categories/');
    }
  }
}
