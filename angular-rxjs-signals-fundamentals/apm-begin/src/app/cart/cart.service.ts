import { Injectable, effect, signal } from '@angular/core';
import { CartItem } from './cart';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  eLength = effect(() =>
    console.log('Cart aray length: ', this.cartItems().length)
  );

  addToCart(product: Product): void {
    // Change signal
    this.cartItems.update((items) => [...items, { product, quantity: 1 }]);
  }
}
