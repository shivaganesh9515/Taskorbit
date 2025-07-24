import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../../shared/card/card';

interface Member { name: string; role: string; }
interface Team {
  id: number;
  name: string;
  description: string;
  members: Member[];
  archived: boolean;
}

@Component({
  selector: 'app-teams',
  templateUrl: './teams.html',
  styleUrls: ['./teams.scss'],
  imports: [CommonModule, FormsModule, Card]
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [
    {
      id: 1,
      name: 'Frontend Squad',
      description: 'Responsible for UI/UX and Angular code.',
      members: [
        { name: 'Jane Smith', role: 'Manager' },
        { name: 'Alex Brown', role: 'Member' },
        { name: 'Emma Garcia', role: 'Member' }
      ],
      archived: false
    },
    {
      id: 2,
      name: 'Backend Crew',
      description: 'API development and database design.',
      members: [
        { name: 'John Doe', role: 'Manager' },
        { name: 'Mike Johnson', role: 'Member' }
      ],
      archived: false
    }
  ];

  availableUsers = [
    'Jane Smith', 'Alex Brown', 'Emma Garcia',
    'John Doe', 'Mike Johnson', 'Sarah Wilson'
  ];

  memberRoles: Record<string, string> = {};   // temp role store

  filteredTeams: Team[] = [];
  searchTerm = '';
  selectedFilter = 'all';

  /* modal controls */
  showTeamModal = false;
  editMode = false;
  currentTeam: Team = this.emptyTeam();

  ngOnInit(): void {
    this.filteredTeams = [...this.teams];
  }

  /* ---------- filtering ---------- */
  filterTeams(): void {
    let list = [...this.teams];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      list = list.filter(t =>
        t.name.toLowerCase().includes(term) ||
        t.members.some(m => m.name.toLowerCase().includes(term))
      );
    }

    if (this.selectedFilter === 'active') {
      list = list.filter(t => !t.archived);
    } else if (this.selectedFilter === 'archived') {
      list = list.filter(t => t.archived);
    }

    this.filteredTeams = list;
  }

  setFilter(f: string): void {
    this.selectedFilter = f;
    this.filterTeams();
  }

  /* ---------- modal helpers ---------- */
  openCreateTeamModal(): void {
    this.editMode = false;
    this.currentTeam = this.emptyTeam();
    this.memberRoles = {};
    this.showTeamModal = true;
  }

  openEditTeamModal(team: Team): void {
    this.editMode = true;
    this.currentTeam = JSON.parse(JSON.stringify(team)); // deep copy
    this.memberRoles = {};
    team.members.forEach(m => this.memberRoles[m.name] = m.role);
    this.showTeamModal = true;
  }

  closeTeamModal(): void { this.showTeamModal = false; }

  /* ---------- save / delete / archive ---------- */
  saveTeam(): void {
    const members: Member[] = Object.keys(this.memberRoles)
      .filter(u => this.memberRoles[u])
      .map(u => ({ name: u, role: this.memberRoles[u] }));

    this.currentTeam.members = members;

    if (this.editMode) {
      const idx = this.teams.findIndex(t => t.id === this.currentTeam.id);
      if (idx > -1) this.teams[idx] = { ...this.currentTeam };
    } else {
      this.currentTeam.id =
        Math.max(0, ...this.teams.map(t => t.id)) + 1;
      this.teams.push({ ...this.currentTeam });
    }

    this.filterTeams();
    this.closeTeamModal();
  }

  toggleArchive(team: Team): void {
    team.archived = !team.archived;
    this.filterTeams();
  }

  manageTeamTasks(team: Team): void {
    alert(`Would navigate to Tasks filtered for team: ${team.name}`);
  }

  /* ---------- member selector ---------- */
  isMemberSelected(user: string): boolean {
    return user in this.memberRoles;
  }

  toggleMember(user: string, e: any): void {
    if (e.target.checked) {
      this.memberRoles[user] = 'Member';
    } else {
      delete this.memberRoles[user];
    }
  }

  /* ---------- utils ---------- */
  getInitials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').toUpperCase();
  }

  emptyTeam(): Team {
    return {
      id: 0,
      name: '',
      description: '',
      members: [],
      archived: false
    };
  }
}
