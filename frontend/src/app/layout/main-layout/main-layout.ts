import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { HeaderComponent } from '../header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [Sidebar, HeaderComponent, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout {

}
