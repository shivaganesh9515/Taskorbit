import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';

// Import components
import { Dashboard } from './pages/dashboard/dashboard';
import { TasksComponent } from './pages/tasks/tasks';
import { ProjectsComponent } from './pages/projects/projects';
import { Teams } from './pages/teams/teams';
import { Reports } from './pages/reports/reports';
import { Profile } from './pages/profile/profile';
import { Login } from './pages/auth/login/login';
import { Signup } from './pages/auth/signup/signup';

export const routes: Routes = [
  // Auth routes (no guard needed)
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  // Protected routes (require authentication)
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'teams', component: Teams, canActivate: [AuthGuard] },
  { path: 'reports', component: Reports, canActivate: [AuthGuard] },
  { path: 'profile', component: Profile, canActivate: [AuthGuard] },

  // Fallback
  { path: '**', redirectTo: '/dashboard' },
];
