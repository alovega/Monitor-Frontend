import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { SystemService } from './shared/system.service';
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
export class AppComponent implements OnInit {
  title = 'helamonitor';
  systems: any;
  currentSystem: any;
  currentSystemId: any;
  currentUser: any;

  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove(e) {
  //   setTimeout(() => {console.log(e)}, 4000);
  // }
  constructor(
    private systemService: SystemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private toastr: ToastrService
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
