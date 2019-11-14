import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {map, shareReplay } from 'rxjs/operators';
import {VERSION} from '@angular/material';
import {NavItem} from './nav-item';
import {NavService} from './nav.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { } from 'rxjs/operators';
import { SystemService } from '../../shared/system.service';
import { AuthenticationService } from '../../shared/auth/authentication.service';


@Component({
  selector: 'hm-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, AfterViewInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay(1),
        );
  systems: any;
  currentSystem: any;
  currentSystemId: any;
  currentUser: any;
  @ViewChild('appDrawer',  {static: true}) appDrawer: ElementRef;
  version = VERSION;
  navItems: NavItem[] = [
    {
      displayName: 'Dashboard',
      iconName: 'pie_chart',
      route: 'dashboard/metrics',
    },
    {
      displayName: 'Incidents',
      iconName: 'bug_report',
      route: 'dashboard/incidents'
    },
    {
      displayName: 'Endpoints',
      iconName: 'data_usage',
      route: 'dashboard/endpoints'
    },
    {
      displayName: 'Users',
      iconName: 'account_box',
      route: 'dashboard/users'
    },
    {
      displayName: 'Configurations',
      iconName: 'group',
      children: [
        {
          displayName: 'Recipients',
          iconName: 'contacts',
          route: 'dashboard/recipients'
        },
        {
          displayName: 'System Recipients',
          iconName: 'accessibility',
          route: 'dashboard/system-recipients'
        },
        {
          displayName: 'Rules',
          iconName: 'bookmark',
          route: 'dashboard/rules'
        },
      ]
    },
    {
      displayName: 'Notifications',
      iconName: 'notifications',
      route: 'notifications'
    },
    {
      displayName: 'Events',
      iconName: 'event',
      route: 'dashboard/events'
    },
  ];

  constructor(
    private systemService: SystemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private breakpointObserver: BreakpointObserver,
    private navService: NavService,
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
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
