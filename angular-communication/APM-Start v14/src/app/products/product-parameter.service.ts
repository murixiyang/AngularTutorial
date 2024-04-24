import { Injectable } from '@angular/core';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductParameterService {
  // Stash state of the product list component
  showImage!: boolean;
  filterBy!: string;

  constructor() {}
}
