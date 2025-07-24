import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../../../shared/card/card';
import { AuthService, SignupRequest } from '../../../auth/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
  imports: [CommonModule, FormsModule, Card, RouterModule]
})
export class SignupComponent {
  signupData: SignupRequest = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get passwordMismatch(): boolean {
    return this.signupData.password !== this.signupData.confirmPassword && 
           this.signupData.confirmPassword.length > 0;
  }

  onSignup(): void {
    if (this.isLoading || this.passwordMismatch) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.signup(this.signupData).subscribe({
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
        this.errorMessage = 'Signup failed. Please try again.';
        console.error('Signup error:', error);
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
