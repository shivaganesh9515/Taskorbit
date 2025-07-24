import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  pageTitle = 'Dashboard';

  private routeTitles: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/tasks': 'Tasks',
    '/projects': 'Projects',
    '/teams': 'Teams',
    '/reports': 'Reports',
    '/profile': 'Profile',
};

constructor(private router: Router) {}

ngOnInit() {
  this.router.events
  .pipe(filter(event => event instanceof NavigationEnd))
  .subscribe((event: any) => {
    const currentRoute = event.urlAfterRedirects;
    this.pageTitle = this.routeTitles[currentRoute] || 'Dashboard';
  });
}
}
