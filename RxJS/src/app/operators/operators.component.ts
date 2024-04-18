import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter, from, map, of, take, tap, timer } from 'rxjs';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.css',
})
export class OperatorsComponent implements OnInit, OnDestroy {
  subApples!: Subscription;
  subFilter!: Subscription;
  subTimer!: Subscription;

  ngOnInit(): void {
    // Best Practice: use $ to indicate an Observable
    const apples$ = from([
      { id: 1, type: 'macintosh' },
      { id: 2, type: 'gala' },
      { id: 3, type: 'fuji' },
    ]);

    // Map: perform to every object
    // ...a: Copy the current object (apple) and create a new object
    // This pipe add a color field to every apple
    this.subApples = apples$
      .pipe(map((a) => ({ ...a, color: 'red' })))
      .subscribe((x) => console.log('Apple:', x));

    // Tap: do not affect objects (debugging)
    this.subApples = apples$
      .pipe(
        map((a) => ({ ...a, color: 'red' })),
        tap((a) => console.log('Apple', a))
      )
      .subscribe();

    // Filter: only evaluate true can output
    this.subFilter = of(2, 3, 4, 5, 6)
      .pipe(
        filter((x) => x % 2 === 0),
        tap((x) => console.log('Even #', x))
      )
      .subscribe();

    // Take: take specified number of objects
    this.subTimer = timer(0, 1000)
      .pipe(take(5))
      .subscribe({
        next: (item) => console.log('Timer: ', item),
        error: (err) => console.error('Timer error occured: ', err),
        complete: () => console.log('No more ticks'),
      });
  }

  ngOnDestroy(): void {
    this.subApples.unsubscribe();
    this.subFilter.unsubscribe();
    this.subTimer.unsubscribe();
  }
}
