import { Controller, Get, Render, Req, Body, Post, Res } from '@nestjs/common';
import { ProductsService } from '../models/products.service';
import { OrdersService } from '../models/orders.service';
import { UsersService } from '../models/users.service';
import { Product } from '../models/product.entity';
import { Order } from '../models/order.entity';
import { Item } from '../models/item.entity';

@Controller('/checkout')
export class CheckoutController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
  ) {}

  @Get('/')
  @Render('checkout/index')
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
    viewData['title'] = 'Оформлення замовлення - Soft Market';
    viewData['subtitle'] = 'Оформлення замовлення';
    viewData['total'] = total;
    viewData['productsInCart'] = productsInCart;

    viewData['breadcrumbs'] = [
      { name: 'Оформлення замовлення', link: '/cart' },
    ];    

    return {
      viewData: viewData,
    };
  }


  @Post('/purchase')
  async purchase(@Body() body, @Req() request, @Res() response) {
    if (!request.session.user) {
      return response.redirect('/auth/login');
    } else if (!request.session.products) {
      return response.redirect('/cart');
    } else {
      const user = await this.usersService.findOne(request.session.user.id);
      const productsInSession = request.session.products;
      const productsInCart = await this.productsService.findByIds(
        Object.keys(productsInSession),
      );

      let total = 0;
      const items: Item[] = [];
      for (let i = 0; i < productsInCart.length; i++) {
        const quantity = productsInSession[productsInCart[i].getId()];
        const item = new Item();
        item.setQuantity(quantity);
        item.setPrice(productsInCart[i].getPrice());
        item.setProduct(productsInCart[i]);
        items.push(item);
        total = total + productsInCart[i].getPrice() * quantity;
      }
      const newOrder = new Order();
      newOrder.setTotal(total);
      newOrder.setItems(items);
      newOrder.setUser(user);
      newOrder.setContactName(body.contactName);
      newOrder.setContactEmail(body.contactEmail);
      newOrder.setContactPhone(body.contactPhone);
      newOrder.setDeliveryType(body.deliveryType);
      newOrder.setPaymentType(body.paymentType);
      const order = await this.ordersService.createOrUpdate(newOrder);

      const newBalance = user.getBalance() - total;
      await this.usersService.updateBalance(user.getId(), newBalance);

      request.session.products = null;

      const viewData = [];
      viewData['title'] = 'Покупка - Soft Market';
      viewData['subtitle'] = 'Дякуємо за ваше замовлення!';
      viewData['orderId'] = order.getId();
      viewData['breadcrumbs'] = [
        {
          name: 'Успішне замовлення'
        }
      ];

      return response.render('checkout/purchase', { viewData: viewData });
    }
  }  
}

  