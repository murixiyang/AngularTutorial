import { Component, OnDestroy, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-component',
  standalone: true,
  imports: [],
  templateUrl: './create-component.component.html',
  styleUrl: './create-component.component.css'
})
export class CreateComponentComponent implements OnInit, OnDestroy {
  ngOnInit(): void {

    // Create using of
    of(2, 4, 6, 8);

  }

  ngOnDestroy(): void {

  }
}
