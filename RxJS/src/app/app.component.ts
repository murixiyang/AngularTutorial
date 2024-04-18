import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateComponentComponent } from './create-component/create-component.component';
import { OperatorsComponent } from './operators/operators.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreateComponentComponent, OperatorsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'RxJS';
}
