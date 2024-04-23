import { Component, computed } from '@angular/core';

import { NgIf, NgFor, CurrencyPipe, AsyncPipe } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { EMPTY, catchError } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, CurrencyPipe],
})
export class ProductDetailComponent {
  product = this.productSvc.product;
  errorMessage = this.productSvc.productError;

  // Set the page title
  pageTitle = computed(() =>
    this.product()
      ? `Product Detail for: ${this.product()?.productName}`
      : 'Product Detail'
  );

  constructor(
    private productSvc: ProductService,
    private cartSvc: CartService
  ) {}

  addToCart(product: Product) {
    this.cartSvc.addToCart(product);
  }
}
