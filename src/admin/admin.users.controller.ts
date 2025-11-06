import {
  Controller, Get, Render, Post, Body, Redirect,
  Param, Req, Res
} from '@nestjs/common';
import {UsersService} from 'src/models/users.service';
import { UserValidator } from '../validators/user.validator';
import { User } from '../models/user.entity';

@Controller('/admin/users')
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @Render('admin/users/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Користувачі - Адмін панель - Soft Market';
    viewData['users'] = await this.usersService.findAll();
    viewData['roles'] = ['client', 'admin'];
    return {
      viewData: viewData,
    };
  }
  
  @Post('/store')
  @Redirect('/admin/users')
  async store(@Body() body, @Req() request) {
    const toValidate: string[] = ['name', 'email', 'password', 'role'];
    const errors: string[] = UserValidator.validate(body, toValidate);
    if (errors.length > 0) {
      request.session.flashErrors = errors;
    } else {
      const newUser = new User();
      newUser.setName(body.name);
      newUser.setEmail(body.email);
      newUser.setPassword(body.password);
      newUser.setRole(body.role);
      newUser.setBalance(1000);
      await this.usersService.createOrUpdate(newUser);
    }
  }

  @Post('/:id')
  @Redirect('/admin/users')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('/:id')
  @Render('admin/users/edit')
  async edit(@Param('id') id: string) {
    const viewData = [];
    viewData['title'] = 'Редагувати користувача - Адмін панель - Soft Market';
    viewData['user'] = await this.usersService.findOne(id);
    viewData['roles'] = ['client', 'admin'];
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
    const toValidate: string[] = ['name', 'email', 'role'];
    const errors: string[] = UserValidator.validate(body, toValidate);
    if (errors.length > 0) {
      request.session.flashErrors = errors;
      return response.redirect('/admin/users/' + id);
    } else {
      const user = await this.usersService.findOne(id);
      user.setName(body.name);
      user.setEmail(body.email);
      user.setRole(body.role);
      await this.usersService.createOrUpdate(user);
      return response.redirect('/admin/users/');
    }
  }
}
