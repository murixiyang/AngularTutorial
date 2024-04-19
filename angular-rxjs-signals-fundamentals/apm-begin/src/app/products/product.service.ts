import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { Product } from './product';
import { ProductData } from './product-data';
import { HttpErrorService } from '../utilities/http-error.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Wrong url for error handling
  private productsUrl = 'api/productsss';
  // private productsUrl = 'api/products';

  constructor(
    private http: HttpClient,
    private errorHandleSvc: HttpErrorService
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
      catchError((err) => this.handleError(err))
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMsg = this.errorHandleSvc.formatError(err);
    return throwError(() => formattedMsg);
    // OR: throw(formattedMsg)
  }
}
