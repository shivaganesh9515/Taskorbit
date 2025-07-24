import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService, User } from '../../auth/auth';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  pageTitle = 'Dashboard';
  showUserMenu = false;

  private routeTitles: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/tasks': 'Tasks',
    '/projects': 'Projects',
    '/teams': 'Teams',
    '/reports': 'Reports',
    '/profile': 'Profile'
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.pageTitle = this.routeTitles[event.url] || 'Dashboard';
        this.showUserMenu = false; // Close menu on navigation
      });
  }

  getCurrentUser(): User | null {
    return this.authService.getCurrentUser();
  }

  getUserInitials(): string {
    const user = this.getCurrentUser();
    return user ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    this.authService.logout();
  }
}
