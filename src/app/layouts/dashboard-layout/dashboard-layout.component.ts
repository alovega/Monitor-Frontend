import { Component, OnInit, Renderer2  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { SystemService } from '../../shared/system.service';
import { System, SystemResponse, SystemsResponse } from '../../shared/models/system';
import { AuthenticationService } from '../../shared/auth/authentication.service';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'hm-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  systems: System[];
  currentSystem: System;
  currentSystemId: any;
  currentUser: any;
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
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    if (this.currentSystem) {
      this.currentSystemId = this.currentSystem.id;
    } else {
      this.systemService.getSystems().subscribe(
        (res: SystemsResponse) => {
          if (res.code === '800.200.001') {
            this.currentSystem = res.data[0];
            this.currentSystemId = this.currentSystem.id;
            localStorage.setItem('currentSystem', JSON.stringify(this.currentSystem));
          } else {
            this.toastr.error('An error occurred. Try again later', 'Error!');
          }
          window.location.reload();
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
}
