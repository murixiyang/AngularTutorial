import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle = 'Product List';
  showImage = false;

  imageWidth = 50;
  imageMargin = 2;
  errorMessage = '';

  @ViewChild('filterElement') filterElementRef: ElementRef | undefined;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.performFilter(this.listFilter);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngAfterViewInit(): void {
    this.filterElementRef?.nativeElement.focus();
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.performFilter(this.listFilter);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(
        (product) =>
          product.productName
            .toLocaleLowerCase()
            .indexOf(filterBy.toLocaleLowerCase()) !== -1
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
}
