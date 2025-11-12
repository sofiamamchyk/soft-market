import {
  Controller, Get, Render, Post, Body, Redirect,
  Param, Req, Res
} from '@nestjs/common';
import {UsersService} from 'src/models/users.service';
import {OrdersService} from 'src/models/orders.service';
import {orderStatusMap} from 'src/utils/orderStatusMap';
import {deliveryTypeMap} from 'src/utils/deliveryTypeMap';
import {paymentTypeMap} from 'src/utils/paymentTypeMap';

@Controller('/admin/orders')
export class AdminOrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService
  ) {}

  @Get('/')
  @Render('admin/orders/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Замовлення - Адмін панель - Soft Market';
    viewData['orders'] = await this.ordersService.findAll();
    return {
      viewData: viewData,
    };
  }

  @Post('/:id')
  @Redirect('/admin/orders')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('/:id')
  @Render('admin/orders/edit')
  async edit(@Param('id') id: string) {
    const viewData = [];
    viewData['title'] = 'Редагувати замовлення - Адмін панель - Soft Market';
    viewData['order'] = await this.ordersService.findOne(id);
    viewData['statuses'] = orderStatusMap;
    viewData['deliveryTypes'] = deliveryTypeMap;
    viewData['paymentTypes'] = paymentTypeMap;
    return {
      viewData: viewData,
    };
  }

  @Post('/:id/update')
  async update(
    @Body() body,
    @Param('id') id: string,
    @Req() request,
    @Res() response,
  ) {
    // const toValidate: string[] = ['name', 'email', 'role'];
    // const errors: string[] = UserValidator.validate(body, toValidate);
    // if (errors.length > 0) {
    //   request.session.flashErrors = errors;
    //   return response.redirect('/admin/orders/' + id);
    // } else {
      const order = await this.ordersService.findOne(id);
      order.setStatus(body.status);
      order.setContactPhone(body.contactPhone);
      order.setContactName(body.contactName);
      order.setContactEmail(body.contactEmail);
      order.setDeliveryType(body.deliveryType);
      order.setPaymentType(body.paymentType);
      await this.ordersService.createOrUpdate(order);

      return response.redirect('/admin/orders/');
  }
}
