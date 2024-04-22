import { Component, OnInit } from '@angular/core';
import { concatMap, delay, mergeMap, of, range, switchMap } from 'rxjs';

@Component({
  selector: 'app-high-order-map',
  standalone: true,
  imports: [],
  templateUrl: './high-order-map.component.html',
  styleUrl: './high-order-map.component.css',
})
export class HighOrderMapComponent implements OnInit {
  /*
    HIGHER ORDER MAP
    1. concat map: one at a time, in order
    2. merge map:  in parallel, first ends comes first
    3. switch map: one at a time, cancel prioir observable, only emit the last observable
  */

  ngOnInit(): void {
    // Concat map
    range(1, 5)
      .pipe(concatMap((i) => of(i).pipe(delay(this.randomDelay()))))
      .subscribe((v) => console.log('concatMap: ', v));

    // Merge map
    range(11, 5)
      .pipe(mergeMap((i) => of(i).pipe(delay(this.randomDelay()))))
      .subscribe((v) => console.log('mergeMap: ', v));

    // Switch map
    range(21, 5)
      .pipe(switchMap((i) => of(i).pipe(delay(this.randomDelay()))))
      .subscribe((v) => console.log('switchMap: ', v));
  }

  randomDelay() {
    // Random delay between 500 and 1499 milliseconds
    return Math.floor(Math.random() * 1000) + 500;
  }
}
