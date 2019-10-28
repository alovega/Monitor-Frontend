import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SystemService } from './shared/system.service';
import {
  Router, NavigationStart, NavigationCancel, NavigationEnd , ActivatedRoute, NavigationError
} from '@angular/router';
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

  constructor(
    private systemService: SystemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
    let body = document.getElementsByTagName('body')[0];

    if (this.currentUser) {
      body.classList.remove('body-logged-out');
    } else {
      body.classList.add('body-logged-out');
    }
  }

  ngOnInit() {
    console.log(this.currentUser);
    // this.loading = false;
    // this.router.events.subscribe((event: Event) => {
    //   switch (true) {
    //     case event instanceof NavigationStart: {
    //       this.loading = true;
    //       // setTimeout(() => this.loading = false, 100);
    //       break;
    //     }

    //     case event instanceof NavigationEnd:
    //     case event instanceof NavigationCancel:
    //     case event instanceof NavigationError: {
    //       this.loading = false;
    //       break;
    //     }
    //     default: {
    //       break;
    //     }
    //   }
    // });
    // this.router.events
    // .subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     this.loading = true;
    //   } else if (
    //     event instanceof NavigationError ||
    //     event instanceof NavigationCancel ||
    //     event instanceof NavigationEnd
    //   ) {
    //     setTimeout(() => this.loading = false, 500);
    //   }
    // });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
