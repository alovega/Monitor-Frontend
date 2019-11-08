import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';

import { SystemService } from '../../shared/system.service';
import { AuthenticationService } from '../../shared/auth/authentication.service';

@Component({
  selector: 'hm-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  systems: any;
  currentSystem: any;
  currentSystemId: any;
  currentUser: any;

  constructor(
    private systemService: SystemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.authService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
    });
    if (this.currentSystem) {
      this.currentSystemId = this.currentSystem.id;
      // this.router.navigate(['dashboard']);
    } else {
      this.systemService.setSystem().subscribe(
        (system) => {
          this.currentSystem = system;
          this.currentSystemId = this.currentSystem.id;
          window.location.reload();
          // this.router.navigate(['dashboard']);
        }
      );
    }
  }
}
