import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../auth/auth';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  bio: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
}

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

interface NotificationSetting {
  label: string;
  description: string;
  email: boolean;
  push: boolean;
}

interface NotificationCategory {
  title: string;
  settings: NotificationSetting[];
}

interface Preferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  autoSave: boolean;
  showShortcuts: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Profile implements OnInit {
  activeTab = 'general';
  
  userProfile: UserProfile = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    department: '',
    bio: ''
  };

  passwordData: PasswordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  securitySettings: SecuritySettings = {
    twoFactorEnabled: false
  };

  activeSessions: Session[] = [
    {
      id: '1',
      device: 'desktop',
      location: 'San Francisco, CA',
      lastActive: 'Active now',
      current: true
    },
    {
      id: '2',
      device: 'mobile',
      location: 'New York, NY',
      lastActive: '2 hours ago',
      current: false
    },
    {
      id: '3',
      device: 'desktop',
      location: 'London, UK',
      lastActive: '1 day ago',
      current: false
    }
  ];

  notificationCategories: NotificationCategory[] = [
    {
      title: 'Task Updates',
      settings: [
        {
          label: 'Task assignments',
          description: 'When you are assigned to a new task',
          email: true,
          push: true
        },
        {
          label: 'Task completions',
          description: 'When tasks assigned to you are completed',
          email: true,
          push: false
        },
        {
          label: 'Due date reminders',
          description: 'Reminders about upcoming task deadlines',
          email: true,
          push: true
        }
      ]
    },
    {
      title: 'Project Updates',
      settings: [
        {
          label: 'Project invitations',
          description: 'When you are invited to join a project',
          email: true,
          push: true
        },
        {
          label: 'Project milestones',
          description: 'When project milestones are reached',
          email: false,
          push: true
        }
      ]
    },
    {
      title: 'Team Activity',
      settings: [
        {
          label: 'Team mentions',
          description: 'When someone mentions you in comments',
          email: true,
          push: true
        },
        {
          label: 'Team updates',
          description: 'Weekly team activity summaries',
          email: true,
          push: false
        }
      ]
    }
  ];

  preferences: Preferences = {
    theme: 'light',
    language: 'en',
    timezone: 'UTC-8',
    autoSave: true,
    showShortcuts: true
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      // Split the name into first and last name
      const nameParts = currentUser.name.split(' ');
      this.userProfile = {
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: currentUser.email,
        phone: '',
        jobTitle: '',
        department: '',
        bio: ''
      };
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getUserInitials(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'U';
  }

  saveProfile() {
    // Implement profile save logic
    console.log('Saving profile:', this.userProfile);
    
    // Show success message
    this.showSuccessMessage('Profile updated successfully!');
  }

  resetToDefaults() {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      this.preferences = {
        theme: 'light',
        language: 'en',
        timezone: 'UTC-8',
        autoSave: true,
        showShortcuts: true
      };
      
      this.showSuccessMessage('Settings reset to defaults');
    }
  }

  changePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.showErrorMessage('Passwords do not match');
      return;
    }

    if (this.passwordData.newPassword.length < 8) {
      this.showErrorMessage('Password must be at least 8 characters long');
      return;
    }

    // Implement password change logic
    console.log('Changing password...');
    
    // Clear password fields
    this.passwordData = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    
    this.showSuccessMessage('Password updated successfully!');
  }

  terminateSession(sessionId: string) {
    if (confirm('Are you sure you want to terminate this session?')) {
      this.activeSessions = this.activeSessions.filter(session => session.id !== sessionId);
      this.showSuccessMessage('Session terminated successfully');
    }
  }

  uploadProfilePicture() {
    // Implement file upload logic
    console.log('Opening file picker...');
  }

  removeProfilePicture() {
    if (confirm('Are you sure you want to remove your profile picture?')) {
      console.log('Removing profile picture...');
      this.showSuccessMessage('Profile picture removed');
    }
  }

  private showSuccessMessage(message: string) {
    // Implement toast notification or alert
    alert(`✅ ${message}`);
  }

  private showErrorMessage(message: string) {
    // Implement toast notification or alert
    alert(`❌ ${message}`);
  }
}
