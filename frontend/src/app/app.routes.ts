import { NgModule } from '@angular/core';
import { Dashboard } from './pages/dashboard/dashboard';
import { TasksComponent } from './pages/tasks/tasks';
import { ProjectsComponent } from './pages/projects/projects';
import { Teams } from './pages/teams/teams';
import { Reports } from './pages/reports/reports';
import { Profile } from './pages/profile/profile';
import { Login } from './pages/auth/login/login';
import { Signup } from './pages/auth/signup/signup';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [];
const rountes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'tasks', component: TasksComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'teams', component: Teams },
    { path: 'reports', component: Reports },
    { path: 'profile', component: Profile },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },   
    { path: '**', redirectTo: '/dashboard' } // Wildcard route for a 404 page
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }