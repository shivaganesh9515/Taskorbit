import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../auth/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule]
})
export class Sidebar {
  isCollapsed = false;
  showMobileMenu = false;
  
  @Output() sidebarToggle = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggle.emit(this.isCollapsed);
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
  }

  getCurrentUser(): User | null {
    return this.authService.getCurrentUser();
  }

  getUserInitials(): string {
    const user = this.getCurrentUser();
    return user ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  }

  toggleUserMenu() {
    // Add user menu functionality here if needed
    console.log('User menu toggled');
  }
}
