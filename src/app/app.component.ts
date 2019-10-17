import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SystemService } from './shared/system.service';
import {
  Router, NavigationStart, NavigationCancel, NavigationEnd , ActivatedRoute
} from '@angular/router';
import { isUndefined } from 'util';


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
  loading;

  constructor(
    private systemService: SystemService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.loading = true;
  }

  ngOnInit() {
    // this.loading = false;\
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        setTimeout(() => this.loading = false, 1000);
      }
    });
  }
}
