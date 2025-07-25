import { Component } from '@angular/core';
import { Sidebar } from "../sidebar/sidebar";
import { Header } from "../header/header";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
  standalone: true,
  imports: [Sidebar, Header, RouterModule]
})
export class MainLayoutComponent {
  sidebarCollapsed = false;
  showMobileSidebar = false;

  onSidebarToggle(collapsed: boolean) {
    this.sidebarCollapsed = collapsed;
  }

  toggleMobileSidebar() {
    this.showMobileSidebar = !this.showMobileSidebar;
  }
}
