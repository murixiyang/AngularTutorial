import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateComponentComponent } from './create-component/create-component.component';
import { OperatorsComponent } from './operators/operators.component';
import { HighOrderMapComponent } from './high-order-map/high-order-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CreateComponentComponent,
    OperatorsComponent,
    HighOrderMapComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'RxJS';
}
