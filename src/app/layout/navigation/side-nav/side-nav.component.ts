import { Component, OnInit, Input } from '@angular/core';
import { SystemService } from '../../../shared/system.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
    this.hideSideNav = this.sideNavService.currentStatus;
    this.sideNavService.showSideNav.subscribe(
      (toggleStatus) => {
        this.hideSideNav = toggleStatus;
        console.log(toggleStatus);
      }
    );
    this.systemService.changeSystem.subscribe(
      systems => {
        let currentSystem = systems[0];
        this.currentSystemId = currentSystem.id;
      }
    );

    let issetCurrentSystem = this.systemService.checkCurrentSystem();
    issetCurrentSystem ? this.systemService.getCurrentSystem()
    .subscribe(systems => this.currentSystemId = systems[0].id) : this.currentSystemId  = this.systemService.checkCurrentSystem();
    // this.currentSystemId = this.currentSystem.id;
    // console.log(this.currentSystemId);
    this.authService.currentUser.subscribe((user) => this.currentUser = user );
  }

  isActive(path) {
    return this.location.path().indexOf(path) > -1;
  }
}
