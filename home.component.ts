import { Component } from '@angular/core';

import { User } from '../models/user';
import { AccountService } from '../services/account.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: User | null;

  constructor(private accountService: AccountService) {
      this.user = this.accountService.userValue;
  }
}
