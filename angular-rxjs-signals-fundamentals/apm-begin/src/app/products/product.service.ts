import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  filter,
  map,
  of,
  shareReplay,
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

  /* SUBJECT:
      - multicasting observable. The emission before subscribe is lost
    BehaviourSubject - always get the intial emission or the latests emission
  */
  private productSelectedSubject = new BehaviorSubject<number | undefined>(
    undefined
  );
  readonly productSelected$ = this.productSelectedSubject.asObservable();

  // Declarative approach
  readonly products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    // Will be cached
    tap((p) => console.log(JSON.stringify(p))),
    // Cache data
    shareReplay(1),
    // Will not be cached
    tap(() => console.log('After caching')),
    catchError((err) => {
      console.error(err);
      // Use local replacement data
      return of(ProductData.products);
    })
  );

  readonly product1$ = this.productSelected$.pipe(
    filter(Boolean),
    switchMap((id) => {
      const productUrl = this.productsUrl + '/' + id;
      return this.http.get<Product>(productUrl).pipe(
        switchMap((product) => this.getProductWithReviews(product)),
        catchError((err) => this.handleError(err))
      );
    })
  );

  // Alternative approach to retreive product
  // Search in the cache of products
  readonly product$ = combineLatest([this.productSelected$, this.products$]).pipe(
    map(([selectedProductId, products]) =>
      products.find((product) => product.id === selectedProductId)
    ),
    filter(Boolean),
    switchMap((product) => this.getProductWithReviews(product)),
    catchError((err) => this.handleError(err))
  );

  constructor(
    private http: HttpClient,
    private errorHandleSvc: HttpErrorService,
    private reviewSvc: ReviewService
  ) {}

  productSelected(selectedProductId: number): void {
    this.productSelectedSubject.next(selectedProductId);
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
