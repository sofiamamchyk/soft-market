import { Controller, Get,Param, Res } from '@nestjs/common';
import { ProductsService } from './models/products.service';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/:id')
  async show(@Param() params, @Res() response) {
    const product = await this.productsService.findOne(params.id);
    if (product === undefined) {
      return response.redirect('/products');
    }
    const viewData = [];
    viewData['title'] = product.getName() + ' - Soft Market';
    viewData['product'] = product;
    viewData['breadcrumbs'] = [
      { name: product.category.getName(), link: `/categories/${product.category.getId()}` },
      { name: product.getName(), link: `/products/${product.getId()}` },
    ];

    return response.render('products/show', { viewData: viewData });
  }
}
