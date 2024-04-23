import { Component } from '@angular/core';

import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, NgClass, ProductDetailComponent],
})
export class ProductListComponent {
  pageTitle = 'Products';

  // Declarative approach
  products = this.productSvc.products;
  errorMessage = this.productSvc.productsError;

  // Selected product id to highlight the entry
  selectedProductId = this.productSvc.selectedProductId;

  constructor(private productSvc: ProductService) {}

  onSelected(productId: number): void {
    this.productSvc.productSelected(productId);
  }
}
