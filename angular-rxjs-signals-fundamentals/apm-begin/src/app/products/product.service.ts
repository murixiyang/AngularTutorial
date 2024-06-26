import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
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
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Product, Result } from './product';
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
  /*
    Subject: log every change
    toObservable: log change when it has chance to
    Here, we only care what product we are selecting now, so can use toObservable
   */
  selectedProductId = signal<number | undefined>(undefined);

  // Declarative approach
  private productsResult$ = this.http.get<Product[]>(this.productsUrl).pipe(
    // If success, map to Result<Product[]>
    map((p) => ({ data: p } as Result<Product[]>)),
    // Will be cached
    tap((p) => console.log(JSON.stringify(p))),
    // Cache data
    shareReplay(1),
    // Will not be cached
    tap(() => console.log('After caching')),
    // If failed, map error to Result<Product[]>
    catchError((err) =>
      of({ data: [], error: this.errorHandleSvc.formatError(err) } as Result<
        Product[]
      >)
    )
  );

  // Signal of observable
  private productsResult = toSignal(this.productsResult$, {
    initialValue: { data: [] } as Result<Product[]>,
  });

  products = computed(() => this.productsResult().data);
  productsError = computed(() => this.productsResult().error);

  private productResult$ = toObservable(this.selectedProductId).pipe(
    filter(Boolean),
    switchMap((id) => {
      const productUrl = this.productsUrl + '/' + id;
      return this.http.get<Product>(productUrl).pipe(
        switchMap((product) => this.getProductWithReviews(product)),
        catchError((err) =>
          of({
            data: undefined,
            error: this.errorHandleSvc.formatError(err),
          } as Result<Product>)
        )
      );
    }),
    map((p) => ({ data: p } as Result<Product>))
  );

  private productResult = toSignal(this.productResult$);
  product = computed(() => this.productResult()?.data);
  productError = computed(() => this.productResult()?.error);

  // Alternative approach to retreive product
  // Search in the cache of products
  // readonly product$ = combineLatest([
  // this.productSelected$,
  // this.products$,
  // ]).pipe(
  // map(([selectedProductId, products]) =>
  // products.find((product) => product.id === selectedProductId)
  // ),
  // filter(Boolean),
  // switchMap((product) => this.getProductWithReviews(product)),
  // catchError((err) => this.handleError(err))
  // );

  constructor(
    private http: HttpClient,
    private errorHandleSvc: HttpErrorService,
    private reviewSvc: ReviewService
  ) {}

  productSelected(selectedProductId: number): void {
    this.selectedProductId.set(selectedProductId);
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
