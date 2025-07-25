import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../../../shared/card/card';
import { AuthService, LoginRequest } from '../../../auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [CommonModule, FormsModule, Card, RouterModule]
})
export class Login {
  credentials: LoginRequest = {
    email: '',
    password: ''
  };
  
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Login failed. Please try again.';
        console.error('Login error:', error);
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
