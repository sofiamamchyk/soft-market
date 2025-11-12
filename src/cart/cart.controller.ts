import { Controller, Get, Render, Req, Redirect, Param, Post } from '@nestjs/common';
import { ProductsService } from '../models/products.service';
import { Product } from '../models/product.entity';

@Controller('/cart')
export class CartController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Get('/')
  @Render('cart/index')
  async index(@Req() request) {
    let total = 0;
    let productsInCart: Product[] = null;
    const productsInSession = request.session.products;
    if (productsInSession) {
      productsInCart = await this.productsService.findByIds(
        Object.keys(productsInSession),
      );
      total = Product.sumPricesByQuantities(productsInCart, productsInSession);
    }

    const viewData = [];
    viewData['title'] = 'Кошик - Soft Market';
    viewData['subtitle'] = 'Кошик';
    viewData['total'] = total;
    viewData['productsInCart'] = productsInCart;

    viewData['breadcrumbs'] = [
      { name: 'Кошик', link: '/cart' },
    ];    

    return {
      viewData: viewData,
    };
  }

  @Post('/add/:id')
  add(@Param('id') id: number, @Req() request) {
    let productsInSession = request.session.products;
    if (!productsInSession) {
      productsInSession = {};
    }
    productsInSession[id] = 1;
    request.session.products = productsInSession;
    return { success: true, cartCount: Object.keys(productsInSession).length };
  }

  @Get('/delete/:id')
  @Redirect('/cart/')
  delete(@Param('id') id: number, @Req() request) {
    let productsInSession = request.session.products;
    if (!productsInSession) {
      return;
    }
    delete productsInSession[id];
    request.session.products = Object.keys(productsInSession).length > 0 ? productsInSession : null;
  }

  @Get('/plus/:id')
  @Redirect('/cart/')
  plus(@Param('id') id: number, @Req() request) {
    let productsInSession = request.session.products;
    if (!productsInSession) {
      productsInSession = {};
    }
    productsInSession[id] = (productsInSession[id] || 0) + 1;
    request.session.products = productsInSession;
  }

  @Get('/minus/:id')
  @Redirect('/cart/')
  minus(@Param('id') id: number, @Req() request) {
    let productsInSession = request.session.products;
    if (!productsInSession) {
      productsInSession = {};
    }
    if (productsInSession[id] >= 2) {
      productsInSession[id] = productsInSession[id] - 1;
    }
    request.session.products = productsInSession;
  }

  @Get('/deleteAll')
  @Redirect('/cart/')
  deleteAll(@Req() request) {
    request.session.products = null;
  }
}

  