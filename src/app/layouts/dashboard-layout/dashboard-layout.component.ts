import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer2, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {map, shareReplay } from 'rxjs/operators';
import {NavigationItems} from '../../shared/models/navigationItems';
import {NavService} from './nav.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { SystemService } from '../../shared/system.service';
import { System, SystemsResponse } from '../../shared/models/system';
import { AuthenticationService } from '../../shared/auth/authentication.service';
import Swal from 'sweetalert2';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
import { ToastrService } from 'ngx-toastr';
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
  systems: System[];
  currentSystem: System;
  currentUser: any;
  navigationItems = new NavigationItems();
  sideBarOpen = true;
  @ViewChild('appDrawer',  {static: true}) appDrawer: ElementRef;
  navItems = this.navigationItems.navItems;
  loaded = false;
  time: any;
  token: string;
  expiresAt: any;
  now: any;
  constructor(
    private systemService: SystemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private breakpointObserver: BreakpointObserver,
    private navService: NavService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // this.navService.openNav();
    this.currentSystem = this.systemService.getCurrentSystem();
    if (this.currentSystem) {
    } else {
      this.systemService.getSystems<SystemsResponse>()
      .subscribe(response => {
        if (response.ok) {
          if (response.body.code === '800.200.001') {
            this.currentSystem = response.body.data[0];
            localStorage.setItem('currentSystem', JSON.stringify(this.currentSystem));
            this.systemService.currentSystemSubject.next(this.currentSystem);
          } else {
            this.toastr.error('An error occurred. Try again later', 'Error!');
          }
          window.location.reload();
        } else {
          // TODO: Add error checks
        }

      });
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
        this.authService.verifyToken(this.token).subscribe();
      } else {
        // console.log('Token still has time.. keep alive');
      }
    }, 30000);
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
    this.navService.openNav();
    this.loaded = true;
    this.cd.detectChanges();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  /***
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
      let countDown: any = 5;
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
        $('#swal2-content').text(displayText.replace(/#1/, countDown));
      }, 1000);
    }
  }
  **/
}
