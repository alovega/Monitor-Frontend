import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';

import { SystemService } from '../shared/system.service';
import { AuthenticationService } from '../shared/auth/authentication.service';

@Component({
  selector: 'hm-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.scss']
})
export class SystemsComponent implements OnInit {
  systems: any;
  currentSystem: any;
  currentSystemId: any;
  currentUser: any;

  constructor(
    private systemService: SystemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.currentSystemId = this.activatedRoute.snapshot.params['system-id'];
    this.authService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
        let issetCurrentSystem = this.systemService.checkCurrentSystem();
        issetCurrentSystem ? this.currentSystem  = issetCurrentSystem : this.systemService.getCurrentSystem()
        .subscribe(systems => {
          this.currentSystem = systems[0];
          this.currentSystemId = this.currentSystem.id;
          this.redirect();
        });
        if (this.currentSystemId) {
          this.redirect();
        } else if (this.currentSystem) {
          this.currentSystemId = this.currentSystem.id;
          this.redirect();
        }
      });

    // if (this.currentSystem && this.currentSystemId) {
    //   this.redirect();
    // }

    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    // this.router.navigate([`system/${this.currentSystemId}/incidents`]));
  }

  redirect() {
    this.router.navigate([`system/${this.currentSystemId}/incidents`]);
  }
}
