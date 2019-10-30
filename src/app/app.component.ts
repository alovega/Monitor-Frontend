import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
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

  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove(e) {
  //   setTimeout(() => {console.log(e)}, 4000);
  // }
  constructor(
    private systemService: SystemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
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
