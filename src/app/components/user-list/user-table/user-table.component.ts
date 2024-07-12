import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UserService, User } from '../../../services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  @Input() searchQuery: string = '';
  @Input() selectedWorkoutType: string = '';
  displayedColumns: string[] = ['name', 'workouts'];
  users: User[] = [];
  filteredUsers: User[] = [];
  expandedElement: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    console.log(this.users);
    
    this.applyFilter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery'] || changes['selectedWorkoutType']) {
      this.applyFilter();
    }
  }

  applyFilter(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesName = user.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesWorkout = this.selectedWorkoutType === '' || user.workouts.some(workout => workout.type === this.selectedWorkoutType);
      return matchesName && matchesWorkout;
    });
  }

  toggleRow(user: User): void {
    this.expandedElement = this.expandedElement === user ? null : user;
  }
}
