import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  searchQuery: string = '';
  selectedWorkoutType: string = '';
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  totalUsers: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.totalUsers = this.userService.getUsers().length;
  }

  onPageChange(event: any): void {
    // Implement pagination logic here
  }
}
