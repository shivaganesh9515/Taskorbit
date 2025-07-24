import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../../shared/card/card';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  team: string[];
  startDate: string;
  dueDate: string;
  totalTasks: number;
  createdAt: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
  imports: [Card, CommonModule, FormsModule]
})
export class ProjectsComponent implements OnInit {
  
  projects: Project[] = [
    {
      id: 1,
      name: 'Taskorbit Development',
      description: 'Complete development of the Taskorbit task management application with modern UI and full functionality.',
      status: 'active',
      priority: 'high',
      progress: 75,
      team: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'],
      startDate: '2025-06-01',
      dueDate: '2025-08-15',
      totalTasks: 24,
      createdAt: '2025-06-01'
    },
    {
      id: 2,
      name: 'Mobile App Design',
      description: 'Design and prototype the mobile version of Taskorbit with responsive layouts and intuitive navigation.',
      status: 'active',
      priority: 'medium',
      progress: 45,
      team: ['Jane Smith', 'Alex Brown', 'Lisa Davis'],
      startDate: '2025-07-01',
      dueDate: '2025-09-30',
      totalTasks: 18,
      createdAt: '2025-07-01'
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      description: 'Launch comprehensive marketing campaign for Taskorbit including social media, content, and partnerships.',
      status: 'on-hold',
      priority: 'low',
      progress: 20,
      team: ['Sarah Wilson', 'Tom Anderson'],
      startDate: '2025-08-01',
      dueDate: '2025-10-31',
      totalTasks: 12,
      createdAt: '2025-07-15'
    },
    {
      id: 4,
      name: 'User Testing Phase',
      description: 'Comprehensive user testing and feedback collection for all Taskorbit features.',
      status: 'completed',
      priority: 'high',
      progress: 100,
      team: ['Mike Johnson', 'Lisa Davis', 'John Doe'],
      startDate: '2025-05-15',
      dueDate: '2025-06-30',
      totalTasks: 8,
      createdAt: '2025-05-15'
    }
  ];

  filteredProjects: Project[] = [];
  searchTerm: string = '';
  selectedFilter: string = 'all';
  
  // Modal state
  showProjectModal: boolean = false;
  isEditMode: boolean = false;
  currentProject: Project = this.getEmptyProject();
  
  // Available team members for selection
  availableMembers: string[] = [
    'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 
    'Alex Brown', 'Lisa Davis', 'Tom Anderson', 'Emma Garcia',
    'David Lee', 'Rachel Green'
  ];

  ngOnInit() {
    this.filteredProjects = [...this.projects];
  }

  // Filter and search methods
  filterProjects() {
    let filtered = [...this.projects];
    
    // Apply text search
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        project.team.some(member => member.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
    
    // Apply status filter
    if (this.selectedFilter !== 'all') {
      filtered = filtered.filter(project => project.status === this.selectedFilter);
    }
    
    this.filteredProjects = filtered;
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
    this.filterProjects();
  }

  // Project statistics
  getTotalProjects(): number {
    return this.projects.length;
  }

  getActiveProjects(): number {
    return this.projects.filter(project => project.status === 'active').length;
  }

  getCompletedProjects(): number {
    return this.projects.filter(project => project.status === 'completed').length;
  }

  getOnHoldProjects(): number {
    return this.projects.filter(project => project.status === 'on-hold').length;
  }

  // Project operations
  openCreateProjectModal() {
    this.isEditMode = false;
    this.currentProject = this.getEmptyProject();
    this.showProjectModal = true;
  }

  editProject(project: Project) {
    this.isEditMode = true;
    this.currentProject = { ...project, team: [...project.team] };
    this.showProjectModal = true;
  }

  closeProjectModal() {
    this.showProjectModal = false;
    this.currentProject = this.getEmptyProject();
  }

  saveProject() {
    if (this.isEditMode) {
      // Update existing project
      const index = this.projects.findIndex(p => p.id === this.currentProject.id);
      if (index !== -1) {
        this.projects[index] = { ...this.currentProject };
      }
    } else {
      // Create new project
      const newProject: Project = {
        ...this.currentProject,
        id: Math.max(...this.projects.map(p => p.id)) + 1,
        totalTasks: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      this.projects.push(newProject);
    }
    
    this.filterProjects();
    this.closeProjectModal();
  }

  deleteProject(id: number) {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      this.projects = this.projects.filter(project => project.id !== id);
      this.filterProjects();
    }
  }

  // Team management
  toggleTeamMember(member: string, event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      if (!this.currentProject.team.includes(member)) {
        this.currentProject.team.push(member);
      }
    } else {
      this.currentProject.team = this.currentProject.team.filter(m => m !== member);
    }
  }

  // Navigation methods
  viewProjectDetails(project: Project) {
    // In a real app, this would navigate to project detail page
    alert(`Viewing details for: ${project.name}`);
  }

  manageProjectTasks(project: Project) {
    // In a real app, this would navigate to tasks filtered by project
    alert(`Managing tasks for: ${project.name}`);
  }

  // Utility methods
  getEmptyProject(): Project {
    return {
      id: 0,
      name: '',
      description: '',
      status: 'active',
      priority: 'medium',
      progress: 0,
      team: [],
      startDate: '',
      dueDate: '',
      totalTasks: 0,
      createdAt: ''
    };
  }

  getInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  isOverdue(dateString: string): boolean {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  }
}
