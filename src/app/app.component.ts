import { Component, OnInit} from '@angular/core';
import { SystemService } from './shared/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from './shared/auth/authentication.service';
import { System } from './shared/models/system';


@Component({
  selector: 'hm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'helamonitor';
  currentSystem: System;
  currentUser: any;

  constructor(
    private systemService: SystemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private toastr: ToastrService,
  ) {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }
  ngOnInit() {
    this.authService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
      }
    );
    this.currentSystem = this.systemService.getCurrentSystem();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
