import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../shared/card/card';
import { AuthService, User } from '../../auth/auth';

interface DashboardStat {
  title: string;
  value: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  change: string;
  type: string;
}

interface Activity {
  user: string;
  text: string;
  time: string;
  status: string;
  type: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Card, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  
  dashboardStats: DashboardStat[] = [
    {
      title: 'Total Tasks',
      value: '24',
      icon: '📋',
      trend: 'up',
      change: '+12% from last week',
      type: 'tasks'
    },
    {
      title: 'Completed',
      value: '18',
      icon: '✅',
      trend: 'up',
      change: '+8% from last week',
      type: 'completed'
    },
    {
      title: 'In Progress',
      value: '4',
      icon: '⏳',
      trend: 'neutral',
      change: 'No change',
      type: 'progress'
    },
    {
      title: 'Team Members',
      value: '12',
      icon: '👥',
      trend: 'up',
      change: '+2 new members',
      type: 'team'
    }
  ];

  recentActivities: Activity[] = [
    {
      user: 'John Doe',
      text: 'completed task "Update user interface"',
      time: '2 minutes ago',
      status: 'Completed',
      type: 'completed'
    },
    {
      user: 'Jane Smith',
      text: 'created new project "Mobile App Design"',
      time: '15 minutes ago',
      status: 'Created',
      type: 'created'
    },
    {
      user: 'Mike Johnson',
      text: 'updated task "Database optimization"',
      time: '1 hour ago',
      status: 'Updated',
      type: 'updated'
    }
  ];

  quickActions = [
    { icon: '➕', label: 'New Task' },
    { icon: '📁', label: 'New Project' },
    { icon: '👥', label: 'Invite Team' },
    { icon: '📊', label: 'View Reports' }
  ];

  projectProgress = [
    { name: 'Taskorbit Development', progress: 75, status: 'on-track' },
    { name: 'Mobile App Design', progress: 45, status: 'on-track' },
    { name: 'Marketing Campaign', progress: 20, status: 'delayed' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Initialize dashboard data
  }

  getCurrentUser(): User | null {
    return this.authService.getCurrentUser();
  }

  getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
  }

  getTrendIcon(trend: string): string {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➖';
    }
  }

  getUserFirstName(): string {
    const user = this.getCurrentUser();
    if (user && user.name) {
      return user.name.split(' ')[0];
    }
    return 'User';
  }
}
