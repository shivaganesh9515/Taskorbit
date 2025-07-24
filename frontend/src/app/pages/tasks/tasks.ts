import { Component, OnInit } from '@angular/core';
import { Card } from '../../shared/card/card';

export interface Task {
  id: number;
  name: string;
  description: string;
  project: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  createdAt: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss'],
  imports: [Card]
})
export class TasksComponent implements OnInit {
  
  // Task data and state
  tasks: Task[] = [
    {
      id: 1,
      name: 'Update user interface',
      description: 'Implement new glassmorphism design for the dashboard',
      project: 'Taskorbit Development',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2025-07-28',
      createdAt: '2025-07-20'
    },
    {
      id: 2,
      name: 'Database optimization',
      description: 'Optimize database queries for better performance',
      project: 'Taskorbit Development',
      priority: 'medium',
      status: 'completed',
      dueDate: '2025-07-25',
      createdAt: '2025-07-18'
    },
    {
      id: 3,
      name: 'User testing',
      description: 'Conduct user testing sessions for new features',
      project: 'Mobile App Design',
      priority: 'high',
      status: 'pending',
      dueDate: '2025-07-30',
      createdAt: '2025-07-22'
    },
    {
      id: 4,
      name: 'Marketing campaign setup',
      description: 'Set up social media marketing campaign',
      project: 'Marketing Campaign',
      priority: 'low',
      status: 'pending',
      dueDate: '2025-08-05',
      createdAt: '2025-07-21'
    }
  ];

  filteredTasks: Task[] = [];
  searchTerm: string = '';
  selectedFilter: string = 'all';
  
  // Modal state
  showTaskModal: boolean = false;
  isEditMode: boolean = false;
  currentTask: Task = this.getEmptyTask();

  ngOnInit() {
    this.filteredTasks = [...this.tasks];
  }

  // Filter and search methods
  filterTasks() {
    let filtered = [...this.tasks];
    
    // Apply text search
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(task => 
        task.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.project.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (this.selectedFilter !== 'all') {
      filtered = filtered.filter(task => task.status === this.selectedFilter);
    }
    
    this.filteredTasks = filtered;
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
    this.filterTasks();
  }

  // Task statistics
  getTotalTasks(): number {
    return this.tasks.length;
  }

  getPendingTasks(): number {
    return this.tasks.filter(task => task.status === 'pending').length;
  }

  getInProgressTasks(): number {
    return this.tasks.filter(task => task.status === 'in-progress').length;
  }

  getCompletedTasks(): number {
    return this.tasks.filter(task => task.status === 'completed').length;
  }

  // Task operations
  openCreateTaskModal() {
    this.isEditMode = false;
    this.currentTask = this.getEmptyTask();
    this.showTaskModal = true;
  }

  editTask(task: Task) {
    this.isEditMode = true;
    this.currentTask = { ...task };
    this.showTaskModal = true;
  }

  closeTaskModal() {
    this.showTaskModal = false;
    this.currentTask = this.getEmptyTask();
  }

  saveTask() {
    if (this.isEditMode) {
      // Update existing task
      const index = this.tasks.findIndex(t => t.id === this.currentTask.id);
      if (index !== -1) {
        this.tasks[index] = { ...this.currentTask };
      }
    } else {
      // Create new task
      const newTask: Task = {
        ...this.currentTask,
        id: Math.max(...this.tasks.map(t => t.id)) + 1,
        createdAt: new Date().toISOString().split('T')[0]
      };
      this.tasks.push(newTask);
    }
    
    this.filterTasks();
    this.closeTaskModal();
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.filterTasks();
    }
  }

  toggleTaskStatus(task: Task) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      if (task.status === 'pending') {
        this.tasks[index].status = 'in-progress';
      } else if (task.status === 'in-progress') {
        this.tasks[index].status = 'completed';
      }
      this.filterTasks();
    }
  }

  // Utility methods
  getEmptyTask(): Task {
    return {
      id: 0,
      name: '',
      description: '',
      project: 'Taskorbit Development',
      priority: 'medium',
      status: 'pending',
      dueDate: '',
      createdAt: ''
    };
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
