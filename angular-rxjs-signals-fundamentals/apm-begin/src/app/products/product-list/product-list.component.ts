import { Component } from '@angular/core';

import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { EMPTY, catchError, tap } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, NgClass, ProductDetailComponent],
})
export class ProductListComponent {
  pageTitle = 'Products';
  errorMessage = '';

  // Declarative approach
  readonly products$ = this.productSvc.products$.pipe(
    tap(() => console.log('In product-list init pipeline')),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  constructor(private productSvc: ProductService) {}

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
