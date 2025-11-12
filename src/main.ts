import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';
import * as session from 'express-session';
import {EOrderStatus} from './models/orderStatus.enum';
import {orderStatusMap} from './utils/orderStatusMap';
import {EDeliveryType} from './models/deliveryType.enum';
import {deliveryTypeMap} from './utils/deliveryTypeMap';
import {paymentTypeMap} from './utils/paymentTypeMap';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/layouts'));
  hbsUtils(hbs).registerWatchedPartials(join(__dirname, '..', 'views/layouts'));

  // Custom Handlebars helpers
  hbs.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  hbs.registerHelper('formatTextareaContent', function(value) {
    return value.split('\n').map(item => item.trim()).join('&#10;');
  });
  hbs.registerHelper('formatPrice', function(value) {
    return (value || 0).toFixed(2);
  });
  hbs.registerHelper('formatLineBreaks', function(value) {
    return value?.replaceAll(/\n/g, '<br>');
  });
  hbs.registerHelper('selected', function(option, value){
    if (option === value) {
        return ' selected';
    } else {
        return ''
    }
  });
  hbs.registerHelper('productInCart', function(products, id, class1, class2){
    if (Object.keys(products || {}).includes(`${id}`)) {
        return class1;
    } else {
        return class2;
    }
  });
  hbs.registerHelper('cartCount', function(products){
    return Object.keys(products || {}).length;
  });

  hbs.registerHelper('orderStatus', function(value: EOrderStatus) {
    return orderStatusMap[value];
  });

  hbs.registerHelper('deliveryType', function(value: EDeliveryType) {
    return deliveryTypeMap[value];
  });

  hbs.registerHelper('paymentType', function(value: EDeliveryType) {
    return paymentTypeMap[value];
  });
  
  app.setViewEngine('hbs');
  app.use(
    session({
      secret: 'nest-book',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(function (req, res, next) {
    res.locals.session = req.session;
    const flashErrors: string[] = req.session.flashErrors;
    if (flashErrors) {
      res.locals.flashErrors = flashErrors;
      req.session.flashErrors = null;
    }
    next();
  });
  app.use('/admin*', function (req, res, next) {
    if (req.session.user && req.session.user.role == 'admin') {
      next();
    } else {
      res.redirect('/');
    }
  });
  app.use('/account*', function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  app.use('/checkout*', function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  });

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
