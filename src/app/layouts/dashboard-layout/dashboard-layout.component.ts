import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild, Renderer2 } from '@angular/core';
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
import Swal from 'sweetalert2';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
declare var $: any;
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
  sideBarOpen = true;
  @ViewChild('appDrawer',  {static: true}) appDrawer: ElementRef;
  navItems: NavItem[] = [
    {
      displayName: 'Dashboard',
      iconName: 'pie_chart',
      routerLink: 'dashboard/metrics',
    },
    {
      displayName: 'Events',
      iconName: 'event',
      routerLink: 'dashboard/events'
    },
    {
      displayName: 'Incidents',
      iconName: 'bug_report',
      routerLink: 'dashboard/incidents'
    },
    {
      displayName: 'Users',
      iconName: 'account_box',
      routerLink: 'dashboard/users'
    },
    {
      displayName: 'Configurations',
      iconName: 'group',
      children: [
        {
          displayName: 'Recipients',
          iconName: 'contacts',
          routerLink: 'dashboard/recipients'
        },
        {
          displayName: 'System Recipients',
          iconName: 'accessibility',
          routerLink: 'dashboard/system-recipients'
        },
        {
          displayName: 'Endpoints',
          iconName: 'data_usage',
          routerLink: 'dashboard/endpoints'
        },
        {
          displayName: 'Rules',
          iconName: 'bookmark',
          routerLink: 'dashboard/rules'
        },
      ]
    },
    {
      displayName: 'Notifications',
      iconName: 'notifications',
      routerLink: 'dashboard/notifications/email-notification'
    },
  ];

  time: any;
  token: string;
  expiresAt: any;
  now: any;
  constructor(
    private systemService: SystemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private breakpointObserver: BreakpointObserver,
    private navService: NavService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
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
    this.authService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
        this.token = this.currentUser.token;
        this.expiresAt = new Date(Number(this.currentUser.expires_at) * 1000);
    });

    setInterval(() => {
      this.now = new Date();
      if (this.expiresAt > this.now && (Math.abs(this.expiresAt - this.now)) < 60000) {
        this.authService.verifyToken(this.token).subscribe(
          () => console.log('Verify token complete')
        );
      } else {
        // console.log (this.expiresAt);
        // console.log('Token still has time.. keep alive');
      }
    }, 1000);
  }

  public inactiveTime() {
    let time;
    let authService = this.authService;
    let router = this.router;
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    function logout() {
      clearInterval(time);
      if (authService.isAuthenticated()) {
        authService.verifyToken(authService.currentUserValue.token).subscribe();
      } else {
        authService.logout();
        showLogoutCountDown();
      }
    }

    function resetTimer() {
      clearInterval(time);
      time = setInterval(logout, 300000);
    }

    function showLogoutCountDown() {
      let countDown:any = 5;
      let displayText: any = 'Logging out in #1 seconds.';
      Swal.fire({
        title: 'Logging out',
        text: displayText.replace(/#1/, countDown),
        timer: countDown * 1000,
        showConfirmButton: false
      }).then(() => {
        window.location.reload();
        router.navigate(['/auth/login']).then(() => {
        });
      });

      let timer = setInterval(() => {
        countDown --;
        if (countDown < 0) {
          clearInterval(timer);
        }
        console.log(countDown);
        $('#swal2-content').text(displayText.replace(/#1/, countDown));
      }, 1000);
    }
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
    this.navService.openNav();
  }
}
