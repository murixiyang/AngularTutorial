import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Product } from './product';
import { ProductData } from './product-data';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Wrong url for error handling
  // private productsUrl = 'api/productsss';
  private productsUrl = 'api/products';

  constructor(
    private http: HttpClient,
    private errorHandleSvc: HttpErrorService,
    private reviewSvc: ReviewService
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(() => console.log('In http pipe')),
      catchError((err) => {
        console.error(err);
        // Use local replacement data
        return of(ProductData.products);
      })
    );
  }

  getProduct(id: number): Observable<Product> {
    const productUrl = this.productsUrl + '/' + id;
    return this.http.get<Product>(productUrl).pipe(
      tap(() => console.log('Get single product')),
      switchMap((product) => this.getProductWithReviews(product)),
      catchError((err) => this.handleError(err))
    );
  }

  getProductWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this.http
        .get<Review[]>(this.reviewSvc.getReviewUrl(product.id))
        .pipe(map((reviews) => ({ ...product, reviews } as Product)));
    } else {
      return of(product);
    }
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMsg = this.errorHandleSvc.formatError(err);
    return throwError(() => formattedMsg);
    // OR: throw(formattedMsg)
  }
}
