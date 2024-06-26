import { Component, OnInit } from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html',
})
export class ProductShellListComponent implements OnInit {
  pageTitle = 'Products';
  products: IProduct[] = [];
  errorMessage = '';
  selectedProduct: IProduct | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => (this.products = products),
      error: (err) => (this.errorMessage = err),
    });

    this.productService.selectedProductChanges$.subscribe(
      (selectedProduct) => (this.selectedProduct = selectedProduct)
    );
  }

  onSelected(product: IProduct) {
    this.productService.changeSelectedProduct(product);
  }
}
