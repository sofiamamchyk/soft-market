import { CartController } from './cart.controller';

describe('CartController', () => {
  let cartController: CartController;

  beforeEach(() => {
    
    cartController = new CartController(null as any);
  });

  // Позитивний тест: додавання товару
  it('should add product to session', () => {
    const request = { session: { products: {} } };
    const result = cartController.add(1, request as any);
    
    expect(request.session.products[1]).toBe(1);
    expect(result.success).toBe(true);
  });

  // Негативний тест: перевірка ліміту
  it('should not decrease quantity below 1', () => {
    const request = { session: { products: { "1": 1 } } };
    cartController.minus(1, request as any);
    
    expect(request.session.products[1]).toBe(1);
  });

  // Тест на повне очищення 
  it('should clear all products from session', () => {
    const request = { session: { products: { "1": 5 } } };
    cartController.deleteAll(request as any);
    
    expect(request.session.products).toBeNull();
  });
});