import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'frontend';
}

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    App
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }