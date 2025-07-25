import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Mock users database
  private users: User[] = [
    {
      id: 1,
      email: 'admin@taskorbit.com',
      name: 'John Doe',
      role: 'admin',
    },
    {
      id: 2,
      email: 'manager@taskorbit.com',
      name: 'Jane Smith',
      role: 'manager',
    },
    {
      id: 3,
      email: 'user@taskorbit.com',
      name: 'Mike Johnson',
      role: 'user',
    },
  ];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Check if user is already logged in on app start
    if (isPlatformBrowser(this.platformId)) {
      this.checkStoredAuth();
    }
  }

  // Login method
  login(
    credentials: LoginRequest
  ): Observable<{ success: boolean; message: string; user?: User }> {
    return new Observable((observer) => {
      setTimeout(() => {
        // Find user by email
        const user = this.users.find((u) => u.email === credentials.email);

        if (user && this.validatePassword(credentials.password)) {
          // Store authentication
          localStorage.setItem('taskorbit_token', 'mock-jwt-token');
          localStorage.setItem('taskorbit_user', JSON.stringify(user));

          // Update subjects
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);

          observer.next({
            success: true,
            message: 'Login successful',
            user: user,
          });
        } else {
          observer.next({
            success: false,
            message: 'Invalid email or password',
          });
        }
        observer.complete();
      }, 1000); // Simulate API delay
    });
  }

  // Signup method
  signup(
    data: SignupRequest
  ): Observable<{ success: boolean; message: string; user?: User }> {
    return new Observable((observer) => {
      setTimeout(() => {
        // Check if email already exists
        const existingUser = this.users.find((u) => u.email === data.email);

        if (existingUser) {
          observer.next({
            success: false,
            message: 'Email already registered',
          });
        } else if (data.password !== data.confirmPassword) {
          observer.next({
            success: false,
            message: 'Passwords do not match',
          });
        } else if (data.password.length < 6) {
          observer.next({
            success: false,
            message: 'Password must be at least 6 characters',
          });
        } else {
          // Create new user
          const newUser: User = {
            id: Math.max(...this.users.map((u) => u.id)) + 1,
            email: data.email,
            name: data.name,
            role: 'user',
          };

          this.users.push(newUser);

          // Auto-login new user
          localStorage.setItem('taskorbit_token', 'mock-jwt-token');
          localStorage.setItem('taskorbit_user', JSON.stringify(newUser));

          this.currentUserSubject.next(newUser);
          this.isAuthenticatedSubject.next(true);

          observer.next({
            success: true,
            message: 'Account created successfully',
            user: newUser,
          });
        }
        observer.complete();
      }, 1000);
    });
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('taskorbit_token');
    localStorage.removeItem('taskorbit_user');

    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);

    this.router.navigate(['/login']);
  }

  // Check stored authentication
  private checkStoredAuth(): void {
    const token = localStorage.getItem('taskorbit_token');
    const userData = localStorage.getItem('taskorbit_user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        this.logout();
      }
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Password validation (mock)
  private validatePassword(password: string): boolean {
    // In real app, this would verify against hashed password
    return password === 'password' || password === 'admin123';
  }

  // Get user role
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  // Check if user has specific role
  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }
}
