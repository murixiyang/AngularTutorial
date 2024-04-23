import { Component, Input, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartItem } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'sw-cart-item',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, NgFor, NgIf],
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  private cartSvc = inject(CartService);

  @Input({ required: true }) set cartItem(value: CartItem) {
    this.cartItemSig.set(value);
  }

  cartItemSig = signal<CartItem>(undefined!);

  // Calculate the extended price
  exPriceSig = computed(
    () => this.cartItemSig().quantity * this.cartItemSig().product.price
  );

  onQuantitySelected(quantity: number): void {
    this.cartSvc.updateQuantity(this.cartItemSig(), quantity);
  }

  removeFromCart(): void {
    this.cartSvc.removeFromCart(this.cartItemSig());
  }

  getStockQuantity(): number {
    return this.cartSvc.getStockQuantity(this.cartItemSig());
  }

  getStockQuantityArray(): number[] {
    const stockQuantity = this.getStockQuantity();
    return Array.from({ length: stockQuantity }, (_, i) => i + 1);
  }
}
