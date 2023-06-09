import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../services/account.service';


@Component({
  selector: 'app-layout-component',
  templateUrl: './layout-component.component.html',
  styleUrls: ['./layout-component.component.scss']
})
export class LayoutComponent {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
      // redirect to home if already logged in
      if (this.accountService.userValue) {
          this.router.navigate(['/']);
      }
  }
}
