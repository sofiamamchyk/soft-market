import { Controller, Get, Param, Render, Req, Res } from '@nestjs/common';
import { OrdersService } from '../models/orders.service';

@Controller('/account')
export class AccountController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/orders')
  @Render('account/orders/index')
  async orders(@Req() request) {
    const viewData = [];
    viewData['title'] = 'Мої замовлення - Soft Market';
    viewData['subtitle'] = 'Мої замовлення';
    viewData['orders'] = await this.ordersService.findByUserId(
      request.session.user.id,
    );
    viewData['breadcrumbs'] = [
      { name: 'Мої замовлення', link: '/account/orders' },
    ];    

    return {
      viewData: viewData,
    };
  }

  @Get('/orders/:id')
  @Render('account/orders/show')
  async show(@Param() params, @Req() request, @Res() response) {
    const order = await this.ordersService.findOne(params.id);
    if (order === undefined) {
      return response.redirect('/account/orders');
    }

    const viewData = [];
    viewData['title'] = `Замовлення №${order.id} - Soft Market`;
    viewData['subtitle'] = `Замовлення №${order.id}`;
    viewData['order'] = order;

    viewData['breadcrumbs'] = [
      { name: 'Мої замовлення', link: '/account/orders' },
      { name: `Замовлення №${order.id}` }
    ];    

    return {
      viewData: viewData,
    };
  }
}
