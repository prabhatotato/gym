import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService, User, Workout } from '../../services/user.service';

@Component({
  selector: 'app-add-entry-dialog',
  templateUrl: './add-entry-dialog.component.html',
  styleUrls: ['./add-entry-dialog.component.css']
})
export class AddEntryDialogComponent implements OnInit {
  entryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<AddEntryDialogComponent>
  ) {
    this.entryForm = this.fb.group({
      name: ['', Validators.required],
      workoutType: ['', Validators.required],
      minutes: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.entryForm.valid) {
      const newUser: User = {
        id: 0, // This will be set by the UserService
        name: this.entryForm.value.name,
        workouts: [
          {
            type: this.entryForm.value.workoutType,
            minutes: this.entryForm.value.minutes
          }
        ]
      };
      this.userService.addUser(newUser);
      this.dialogRef.close();
      console.log('valid\n',newUser);
      
    }else{
      console.log('invalid\n');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
