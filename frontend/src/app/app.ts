import { Component } from '@angular/core';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [MainLayoutComponent],
})
export class App {
  title = 'TaskOrbit';
}
