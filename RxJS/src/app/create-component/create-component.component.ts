import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, from, fromEvent, of } from 'rxjs';

@Component({
  selector: 'app-create-component',
  standalone: true,
  imports: [],
  templateUrl: './create-component.component.html',
  styleUrl: './create-component.component.css',
})
export class CreateComponentComponent implements OnInit, OnDestroy {
  subOf!: Subscription;
  subOfArray!: Subscription;
  subFrom!: Subscription;
  subEventClick!: Subscription;
  subEventKey!: Subscription;

  ngOnInit(): void {
    // Create using of
    this.subOf = of(2, 4, 6, 8).subscribe((item) =>
      console.log('Value from of: ', item)
    );

    // Create using of array
    this.subOfArray = of([2, 4, 6, 8]).subscribe((item) =>
      console.log('Value from of array: ', item)
    );

    // create using from
    this.subFrom = from([20, 15, 10, 5]).subscribe({
      next: (item) => console.log('From item: ', item),
      error: (err) => console.log('From error: ', err),
      complete: () => console.log('From complete'),
    });

    // create using fromEvent
    this.subEventClick = fromEvent(document, 'click').subscribe({
      next: (ev) => console.log('Click event: ', ev.target),
      error: (err) => console.log('Error occurred', err),
      complete: () => console.log('No more events'),
    });

    const keys: string[] = [];
    this.subEventKey = fromEvent(document, 'keydown').subscribe((ev) => {
      keys.push((ev as KeyboardEvent).key);
      console.log('Key event: ', keys);
    });
  }

  ngOnDestroy(): void {
    this.subOf.unsubscribe();
    this.subOfArray.unsubscribe();
    this.subFrom.unsubscribe();
    this.subEventClick.unsubscribe();
    this.subEventKey.unsubscribe();
  }
}
