import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle = 'Product List';
  includeDetail = true;

  @ViewChild(CriteriaComponent)
  filterComponent!: CriteriaComponent;

  imageWidth = 50;
  imageMargin = 2;
  errorMessage = '';

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  get showImage(): boolean {
    return this.productParameterSvc.showImage;
  }
  set showImage(value: boolean) {
    this.productParameterSvc.showImage = value;
  }

  constructor(
    private productService: ProductService,
    private productParameterSvc: ProductParameterService
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        // Allows referencing the ViewChild property in ngOnInit and
        // Prevents the 'Expression has changed after it was checked' error 
        setTimeout(() => {
          if (this.filterComponent) {
            // Set child component value, will call set in child, and onValueChange in parent
            this.filterComponent.listFilter =
              this.productParameterSvc.filterBy;
          }})
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onValueChange(value: string): void {
    this.productParameterSvc.filterBy = value;
    this.performFilter(value);
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
