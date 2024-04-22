import { CurrencyPipe, NgFor } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [NgFor, FormsModule, CurrencyPipe],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.css',
})
export class SignalComponent {
  quantity = signal(1);
  quantityAvailable = signal([1, 2, 3, 4, 5, 6]);

  selectedProduct = signal<Product>({ id: 5, name: 'Hammer', price: 12 });

  readonly exPrice = computed(
    () => this.selectedProduct().price * this.quantity()
  );
  readonly color = computed(() => (this.exPrice() > 50 ? 'green' : 'blue'));

  e = effect(() => console.log('In effect, price: ', this.exPrice));

  constructor() {
    console.log('In constructor: ', this.quantity());

    // Execute everytime quantity changes
    effect(() => console.log('In effect: ', this.quantity()));
  }

  onQuantitySelected(qty: number) {
    this.quantity.set(qty);
  }
}

export interface Product {
  id: number;
  name: string;
  price: number;
}
