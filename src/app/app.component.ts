import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { SystemService } from './shared/system.service';
import {VERSION} from '@angular/material';
import {NavItem} from './nav-item';
import {NavService} from './nav.service';
import {
  Router, NavigationStart, NavigationCancel, NavigationEnd , ActivatedRoute, NavigationError
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { AuthenticationService } from './shared/auth/authentication.service';


@Component({
  selector: 'hm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'helamonitor';
  systems: any;
  currentSystem: any;
  currentSystemId: any;
  currentUser: any;

  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove(e) {
  //   setTimeout(() => {console.log(e)}, 4000);
  // }
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
      displayName: 'Recipient Configurations',
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
          displayName: 'Notifications',
          iconName: 'notifications',
          route: 'dashboard/notifications'
        }
      ]
    },
    {
      displayName: 'Rules',
      iconName: 'bookmark',
      route: 'dashboard/rules'
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
    private navService: NavService,
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
    this.currentSystem ? this.currentSystemId = this.currentSystem.id : this.currentSystemId = null;
    let body = document.getElementsByTagName('body')[0];
    if (this.currentUser) {
      body.classList.remove('body-logged-out');
    } else {
      body.classList.add('body-logged-out');
    }
    // setTimeout(() => this.toastr.success('Hello world!', 'Toastr fun!'))
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
