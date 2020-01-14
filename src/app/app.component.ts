import { Component, OnInit } from '@angular/core';
import { SystemService } from './shared/system.service';
import { Router } from '@angular/router';

import { AuthenticationService } from './shared/auth/authentication.service';
import { System } from './shared/models/system';
import { User } from './views/users/user';


@Component({
  selector: 'hm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'helamonitor';
  currentSystem: System;
  currentUser: User;
  loading = true;

  constructor(
    private systemService: SystemService,
    private router: Router,
    private authService: AuthenticationService,
  ) {
  }
  ngOnInit() {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
    this.currentSystem = this.systemService.getCurrentSystem();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth', 'login']);
  }
}
