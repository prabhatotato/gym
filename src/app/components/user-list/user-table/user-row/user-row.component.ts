import { Component, Input } from '@angular/core';
import { User } from '../../../../services/user.service';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css']
})
export class UserRowComponent {
  @Input() user!: User;
}
