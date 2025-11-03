import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('index')
  index() {
    const viewData = [];
    viewData['title'] = 'Головна Сторінка - Soft Market';
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
    viewData['description'] = 'This is an about page ...';
    viewData['author'] = 'Developed by: Your Name';
    return {
      viewData: viewData,
    };
  }
}
