import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { SystemService } from '../../../shared/system.service';
import { AuthenticationService } from 'src/app/shared/auth/authentication.service';
import { SideNavToggleService } from 'src/app/shared/side-nav-toggle.service';


@Component({
  selector: 'hm-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  currentSystemId: any;
  currentSystem: any;
  currentEscalationLevel: any;
  currentEscalationLevelId: any;
  incidentsUrl = `/system/{{currentSystemId}}/incidents`;
  currentUser: any;
  @Input() toggleStatus;
  hideSideNav: any;

  constructor(
    private systemService: SystemService,
    private location: Location,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    public sideNavService: SideNavToggleService
  ) { }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;
    this.authService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
    });
    this.hideSideNav = this.sideNavService.currentStatus;
    this.sideNavService.showSideNav.subscribe(
      (toggleStatus) => {
        this.hideSideNav = toggleStatus;
        console.log(toggleStatus);
      }
    );
  }

  isActive(path) {
    return this.location.path().indexOf(path) > -1;
  }
}
