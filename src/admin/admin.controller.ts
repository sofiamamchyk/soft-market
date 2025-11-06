import { Controller, Get, Render } from '@nestjs/common';

@Controller('/admin')
export class AdminController {
  @Get('/')
  @Render('admin/index')
  index() {
    const viewData = [];
    viewData['title'] = 'Головна - Адмін панель - Soft Market';
    return {
      viewData: viewData,
    };
  }
}
