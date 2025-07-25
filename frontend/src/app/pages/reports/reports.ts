import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface KeyMetric {
  title: string;
  value: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  change: string;
  percentage: number;
}

interface ChartData {
  label: string;
  value: number;
  percentage: number;
}

interface TeamMember {
  name: string;
  role: string;
  tasksCompleted: number;
  efficiency: number;
}

interface ProjectStatus {
  label: string;
  count: number;
  color: string;
}

interface Activity {
  user: string;
  action: string;
  time: string;
  status: string;
  type: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Reports implements OnInit {
  selectedTimeRange = '30days';
  chartTimeframe = 'weekly';

  keyMetrics: KeyMetric[] = [
    {
      title: 'Total Tasks',
      value: '147',
      icon: '📋',
      trend: 'up',
      change: '+23% vs last month',
      percentage: 85
    },
    {
      title: 'Completed',
      value: '132',
      icon: '✅',
      trend: 'up',
      change: '+18% vs last month',
      percentage: 90
    },
    {
      title: 'Productivity',
      value: '94%',
      icon: '⚡',
      trend: 'up',
      change: '+5% vs last month',
      percentage: 94
    },
    {
      title: 'Team Velocity',
      value: '8.7',
      icon: '🚀',
      trend: 'neutral',
      change: 'No change',
      percentage: 87
    }
  ];

  chartData: ChartData[] = [
    { label: 'Mon', value: 12, percentage: 60 },
    { label: 'Tue', value: 18, percentage: 90 },
    { label: 'Wed', value: 8, percentage: 40 },
    { label: 'Thu', value: 22, percentage: 100 },
    { label: 'Fri', value: 15, percentage: 75 },
    { label: 'Sat', value: 5, percentage: 25 },
    { label: 'Sun', value: 3, percentage: 15 }
  ];

  chartLabels: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  teamPerformance: TeamMember[] = [
    {
      name: 'John Doe',
      role: 'Frontend Developer',
      tasksCompleted: 24,
      efficiency: 94
    },
    {
      name: 'Jane Smith',
      role: 'UI/UX Designer',
      tasksCompleted: 18,
      efficiency: 87
    },
    {
      name: 'Mike Johnson',
      role: 'Backend Developer',
      tasksCompleted: 21,
      efficiency: 91
    },
    {
      name: 'Sarah Wilson',
      role: 'Project Manager',
      tasksCompleted: 15,
      efficiency: 96
    }
  ];

  projectStatusData: ProjectStatus[] = [
    { label: 'Active', count: 8, color: '#10b981' },
    { label: 'Completed', count: 12, color: '#6366f1' },
    { label: 'On Hold', count: 3, color: '#f59e0b' },
    { label: 'Planning', count: 2, color: '#8b5cf6' }
  ];

  recentActivities: Activity[] = [
    {
      user: 'John Doe',
      action: 'completed task "Update user interface"',
      time: '5 minutes ago',
      status: 'Completed',
      type: 'completed'
    },
    {
      user: 'Jane Smith',
      action: 'created new project "Mobile App Design"',
      time: '2 hours ago',
      status: 'Created',
      type: 'created'
    },
    {
      user: 'Mike Johnson',
      action: 'updated task "Database optimization"',
      time: '4 hours ago',
      status: 'Updated',
      type: 'updated'
    },
    {
      user: 'Sarah Wilson',
      action: 'assigned task to team member',
      time: '6 hours ago',
      status: 'Assigned',
      type: 'created'
    },
    {
      user: 'Alex Brown',
      action: 'completed milestone "Phase 1"',
      time: '1 day ago',
      status: 'Milestone',
      type: 'completed'
    }
  ];

  ngOnInit() {
    this.updateReports();
  }

  updateReports() {
    // Simulate loading new data based on selected time range
    console.log('Updating reports for:', this.selectedTimeRange);
    // In a real app, you would call your API service here
  }

  setChartTimeframe(timeframe: string) {
    this.chartTimeframe = timeframe;
    this.updateChartData();
  }

  updateChartData() {
    // Update chart data based on timeframe
    if (this.chartTimeframe === 'daily') {
      this.chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      this.chartData = [
        { label: 'Mon', value: 12, percentage: 60 },
        { label: 'Tue', value: 18, percentage: 90 },
        { label: 'Wed', value: 8, percentage: 40 },
        { label: 'Thu', value: 22, percentage: 100 },
        { label: 'Fri', value: 15, percentage: 75 },
        { label: 'Sat', value: 5, percentage: 25 },
        { label: 'Sun', value: 3, percentage: 15 }
      ];
    } else if (this.chartTimeframe === 'weekly') {
      this.chartLabels = ['W1', 'W2', 'W3', 'W4'];
      this.chartData = [
        { label: 'W1', value: 85, percentage: 70 },
        { label: 'W2', value: 92, percentage: 80 },
        { label: 'W3', value: 108, percentage: 90 },
        { label: 'W4', value: 120, percentage: 100 }
      ];
    } else {
      this.chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      this.chartData = [
        { label: 'Jan', value: 320, percentage: 60 },
        { label: 'Feb', value: 380, percentage: 75 },
        { label: 'Mar', value: 420, percentage: 85 },
        { label: 'Apr', value: 480, percentage: 95 },
        { label: 'May', value: 510, percentage: 100 },
        { label: 'Jun', value: 475, percentage: 90 }
      ];
    }
  }

  getTrendIcon(trend: string): string {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➖';
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getTotalProjects(): number {
    return this.projectStatusData.reduce((total, status) => total + status.count, 0);
  }

  exportReport() {
    // Implement export functionality
    console.log('Exporting report...');
  }

  generateReport() {
    // Implement custom report generation
    console.log('Generating custom report...');
  }
}
