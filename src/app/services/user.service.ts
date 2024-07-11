import { Injectable } from '@angular/core';

export interface Workout {
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageKey = 'userData';

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    if (!localStorage.getItem(this.localStorageKey)) {
      const initialData: User[] = [
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [
            { type: 'Swimming', minutes: 60 },
            { type: 'Running', minutes: 20 }
          ]
        },
        {
          id: 3,
          name: 'Mike Johnson',
          workouts: [
            { type: 'Yoga', minutes: 50 },
            { type: 'Cycling', minutes: 40 }
          ]
        }
      ];
      localStorage.setItem(this.localStorageKey, JSON.stringify(initialData));
    }
  }

  addUser(user: User): void {
    try {
      const users = this.getUsers();
      user.id = this.generateUniqueId(users);
      users.push(user);
      localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  getUsers(): User[] {
    try {
      return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    } catch (error) {
      console.error('Error retrieving users:', error);
      return [];
    }
  }

  searchUsers(name: string): User[] {
    const users = this.getUsers();
    return users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
  }

  filterUsers(workoutType: string): User[] {
    const users = this.getUsers();
    return users.filter(user => user.workouts.some(workout => workout.type.toLowerCase() === workoutType.toLowerCase()));
  }

  paginateUsers(page: number, pageSize: number): User[] {
    const users = this.getUsers();
    const startIndex = (page - 1) * pageSize;
    return users.slice(startIndex, startIndex + pageSize);
  }

  updateUser(user: User): void {
    try {
      const users = this.getUsers();
      const index = users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        users[index] = user;
        localStorage.setItem(this.localStorageKey, JSON.stringify(users));
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  deleteUser(userId: number): void {
    try {
      const users = this.getUsers();
      const updatedUsers = users.filter(user => user.id !== userId);
      localStorage.setItem(this.localStorageKey, JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  private generateUniqueId(users: User[]): number {
    return users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }
}
