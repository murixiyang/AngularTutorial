import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';

@Component({
  selector: 'pm-product-shell-detail',
  templateUrl: './product-shell-detail.component.html',
})
export class ProductShellDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  // Need to handle null to allow for no selected product.

  product: IProduct | null = null;

  errorMessage = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Subscribe to the selectedProductChanges$ observable
    this.productService.selectedProductChanges$.subscribe((selectedProduct) => {
      this.product = selectedProduct;
    });
  }
}
