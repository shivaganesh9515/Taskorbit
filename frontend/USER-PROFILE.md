# 👤 User Profile System Guide

This guide explains how to customize and modify the user profile system in your TaskOrbit application.

## 📋 Table of Contents
- [Overview](#overview)
- [User Data Structure](#user-data-structure)
- [Adding New Users](#adding-new-users)
- [Modifying User Information](#modifying-user-information)
- [Customizing Profile Display](#customizing-profile-display)
- [Adding New Profile Fields](#adding-new-profile-fields)
- [Profile Page Customization](#profile-page-customization)
- [Authentication Changes](#authentication-changes)

## 🔍 Overview

The user profile system consists of several key components:
- **User Interface**: Defined in `src/app/auth/auth.ts`
- **Authentication Service**: Handles user login/logout
- **Profile Component**: Located in `src/app/pages/profile/profile.ts`
- **Header Display**: Shows user info in `src/app/layout/header/header.html`

## 📊 User Data Structure

### Current User Interface
```typescript
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
}
```

### How to Add New Fields
1. **Open** `src/app/auth/auth.ts`
2. **Find** the `User` interface
3. **Add** your new field:

```typescript
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
  // Add new fields here
  phone?: string;
  department?: string;
  joinDate?: string;
  bio?: string;
}
```

## 👥 Adding New Users

### Step 1: Locate the Users Array
**File**: `src/app/auth/auth.ts`
**Find**: The `users` array around line 35

### Step 2: Add New User
```typescript
private users: User[] = [
  {
    id: 1,
    email: 'admin@taskorbit.com',
    name: 'John Doe',
    role: 'admin',
  },
  // Add your new user here
  {
    id: 4, // Use next available ID
    email: 'newuser@taskorbit.com',
    name: 'New User Name',
    role: 'user', // or 'admin' or 'manager'
    phone: '+1234567890', // if you added phone field
    department: 'Engineering', // if you added department field
  },
];
```

### Step 3: Test the New User
1. **Run** your application: `ng serve`
2. **Go to** login page
3. **Use** the new credentials to login

## ✏️ Modifying User Information

### Change Existing User Data
1. **Open** `src/app/auth/auth.ts`
2. **Find** the user you want to modify
3. **Update** the fields:

```typescript
{
  id: 1,
  email: 'admin@taskorbit.com',
  name: 'Updated Admin Name', // Changed name
  role: 'admin',
  avatar: 'path/to/avatar.jpg', // Added avatar
},
```

### Change Default Password
**Find** the `validatePassword` method and update:
```typescript
private validatePassword(password: string): boolean {
  // Change 'password' to your new default password
  return password === 'newpassword' || password === 'admin123';
}
```

## 🎨 Customizing Profile Display

### Header User Display
**File**: `src/app/layout/header/header.html`

#### Change User Avatar Style
**Find** the avatar div and modify:
```html
<div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
  {{ getUserInitials() }}
</div>
```

#### Add More User Info
```html
<div class="hidden sm:flex flex-col items-start">
  <span class="text-sm font-medium">{{ getCurrentUser()?.name }}</span>
  <span class="text-xs capitalize">{{ getCurrentUser()?.role }}</span>
  <!-- Add new field display -->
  <span class="text-xs">{{ getCurrentUser()?.department }}</span>
</div>
```

### Dropdown Menu Items
**Add new menu items** in the user dropdown:
```html
<a routerLink="/settings" 
   class="flex items-center gap-3 w-full px-6 py-3 hover:bg-white hover:bg-opacity-10">
  <span class="text-base w-5 text-center">⚙️</span>
  Settings
</a>
```

## 📝 Adding New Profile Fields

### Step 1: Update User Interface
```typescript
export interface User {
  // ... existing fields
  phone?: string;
  department?: string;
  bio?: string;
  location?: string;
}
```

### Step 2: Update Mock Users
```typescript
private users: User[] = [
  {
    id: 1,
    email: 'admin@taskorbit.com',
    name: 'John Doe',
    role: 'admin',
    phone: '+1-555-0123',
    department: 'IT',
    bio: 'System Administrator',
    location: 'New York, NY',
  },
  // ... other users
];
```

### Step 3: Display New Fields
**In header or profile page**:
```html
<div *ngIf="getCurrentUser()?.phone">
  📞 {{ getCurrentUser()?.phone }}
</div>
<div *ngIf="getCurrentUser()?.department">
  🏢 {{ getCurrentUser()?.department }}
</div>
```

## 🏠 Profile Page Customization

### Current Profile Component
**File**: `src/app/pages/profile/profile.ts`

### Add Profile Form
```typescript
export class Profile implements OnInit {
  user: User | null = null;
  editMode = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveProfile() {
    // Add save logic here
    this.editMode = false;
  }
}
```

### Create Profile Template
**File**: `src/app/pages/profile/profile.html` (create if doesn't exist)
```html
<div class="profile-container">
  <app-card>
    <div class="profile-header">
      <div class="user-avatar">
        {{ user?.name?.charAt(0) }}
      </div>
      <h2>{{ user?.name }}</h2>
      <p>{{ user?.role }}</p>
    </div>

    <div class="profile-details">
      <div class="detail-item">
        <label>Email:</label>
        <span>{{ user?.email }}</span>
      </div>
      
      <div class="detail-item" *ngIf="user?.phone">
        <label>Phone:</label>
        <span>{{ user?.phone }}</span>
      </div>
      
      <div class="detail-item" *ngIf="user?.department">
        <label>Department:</label>
        <span>{{ user?.department }}</span>
      </div>
    </div>

    <button class="btn-primary" (click)="toggleEditMode()">
      {{ editMode ? 'Cancel' : 'Edit Profile' }}
    </button>
  </app-card>
</div>
```

## 🔐 Authentication Changes

### Add New User Roles
1. **Update** the User interface:
```typescript
role: 'admin' | 'manager' | 'user' | 'guest' | 'supervisor';
```

2. **Add** role-based permissions:
```typescript
hasPermission(permission: string): boolean {
  const user = this.getCurrentUser();
  if (!user) return false;

  const permissions = {
    admin: ['all'],
    manager: ['read', 'write', 'manage_team'],
    user: ['read', 'write'],
    guest: ['read']
  };

  return permissions[user.role]?.includes(permission) || 
         permissions[user.role]?.includes('all');
}
```

### Custom Login Validation
```typescript
private validateUser(email: string, password: string): User | null {
  const user = this.users.find(u => u.email === email);
  
  if (!user) return null;
  
  // Add custom validation logic
  if (user.role === 'admin' && password !== 'admin123') {
    return null;
  }
  
  if (password === 'password' || password === 'admin123') {
    return user;
  }
  
  return null;
}
```

## 🎯 Quick Tasks

### Task 1: Add Phone Number Field
1. Add `phone?: string` to User interface
2. Add phone to mock users
3. Display phone in header dropdown
4. Test the changes

### Task 2: Create Department Filter
1. Add `department` field to users
2. Create department-based user filtering
3. Add department display in profile

### Task 3: Custom Avatar Support
1. Add `avatar?: string` to User interface
2. Update avatar display logic
3. Add avatar upload functionality

## 🚀 Testing Your Changes

### Step 1: Start Development Server
```bash
cd frontend
ng serve
```

### Step 2: Test Login
- Go to `http://localhost:4200`
- Try logging in with modified credentials
- Check if new fields display correctly

### Step 3: Verify Profile Display
- Click on user avatar in header
- Check dropdown menu items
- Navigate to profile page
- Verify all new fields show up

## 📚 Common Issues & Solutions

### Issue: New fields not showing
**Solution**: Make sure you've updated both the interface and mock data

### Issue: Login not working
**Solution**: Check the `validatePassword` method includes your new password

### Issue: Dropdown not displaying
**Solution**: Verify HTML structure and CSS classes are correct

### Issue: Profile page blank
**Solution**: Ensure the profile component is properly imported and routed

## 💡 Pro Tips

1. **Always backup** your files before making changes
2. **Test incrementally** - make one change at a time
3. **Use browser dev tools** to debug display issues
4. **Check console** for any error messages
5. **Restart dev server** after major changes

## 🔗 Related Files

- `src/app/auth/auth.ts` - User data and authentication
- `src/app/layout/header/header.html` - Header display
- `src/app/layout/header/header.ts` - Header logic
- `src/app/pages/profile/profile.ts` - Profile page
- `src/app/auth/auth-guard.ts` - Route protection

---

**Need help?** Check the browser console for errors or refer to the main documentation files in the project root.