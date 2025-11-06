import {
  Controller, Get, Render, Post, Body, Redirect,
  Param, Req, Res
} from '@nestjs/common';
import {UsersService} from 'src/models/users.service';
import { UserValidator } from '../validators/user.validator';
import { User } from '../models/user.entity';
import {OrdersService} from 'src/models/orders.service';

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
    //   return response.redirect('/admin/users/' + id);
    // } else {
    //   const user = await this.usersService.findOne(id);
    //   user.setName(body.name);
    //   user.setEmail(body.email);
    //   user.setRole(body.role);
    //   await this.usersService.update(user);
    //   return response.redirect('/admin/users/');
    // }
  }
}
