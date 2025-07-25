import { Component, OnInit, EventEmitter, Output, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../auth/auth';
import { filter } from 'rxjs/operators';

interface Notification {
  id: number;
  text: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class Header implements OnInit {
  pageTitle = 'Dashboard';
  breadcrumbs: string[] = [];
  showUserMenu = false;
  showMobileMenu = false;
  showNotifications = false;
  showSearchResults = false;
  isDarkMode = false;
  searchQuery = '';
  unreadNotifications = 3;

  @Output() mobileMenuToggle = new EventEmitter<boolean>();

  notifications: Notification[] = [
    {
      id: 1,
      text: 'New task assigned: Update user interface',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      text: 'Project deadline approaching: Mobile App Design',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      text: 'Team meeting scheduled for tomorrow',
      time: '2 hours ago',
      read: true
    }
  ];

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
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.pageTitle = this.routeTitles[event.url] || 'Dashboard';
        this.updateBreadcrumbs(event.url);
        this.closeAllDropdowns();
      });

    // Load theme preference (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = localStorage.getItem('theme') === 'dark';
    }
  }

  updateBreadcrumbs(url: string) {
    const segments = url.split('/').filter(segment => segment);
    this.breadcrumbs = segments.map(segment => 
      this.routeTitles['/' + segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    );
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
    this.mobileMenuToggle.emit(this.showMobileMenu);
  }

  toggleUserMenu() {
    console.log('Toggle user menu clicked, current state:', this.showUserMenu);
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
    console.log('New user menu state:', this.showUserMenu);
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    this.showUserMenu = false;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
      // Apply theme to document
      document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    }
  }

  hideSearchResults() {
    setTimeout(() => {
      this.showSearchResults = false;
    }, 200);
  }

  closeAllDropdowns() {
    this.showUserMenu = false;
    this.showNotifications = false;
    this.showSearchResults = false;
  }

  getCurrentUser(): User | null {
    return this.authService.getCurrentUser();
  }

  getUserInitials(): string {
    const user = this.getCurrentUser();
    return user ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  }

  logout(): void {
    console.log('Logout clicked');
    this.closeAllDropdowns();
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const userMenuContainer = target.closest('.relative');
    
    // Close dropdowns if clicking outside
    if (!userMenuContainer || !userMenuContainer.contains(target)) {
      this.closeAllDropdowns();
    }
  }
}

// Export with expected name
export { Header as HeaderComponent };