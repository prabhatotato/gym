import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEntryDialogComponent } from '../add-entry-dialog/add-entry-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog) { }

  openAddEntryDialog(): void {
    this.dialog.open(AddEntryDialogComponent, {
      width: '300px'
    });
  }
}
