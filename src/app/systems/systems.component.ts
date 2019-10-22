import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';

import { SystemService } from '../shared/system.service';

@Component({
  selector: 'hm-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.scss']
})
export class SystemsComponent implements OnInit {
  systems: any;
  currentSystem: any;
  currentSystemId: any;
  constructor(
    private systemService: SystemService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentSystemId = this.activatedRoute.snapshot.params['system-id'];
    let issetCurrentSystem = this.systemService.checkCurrentSystem();
    issetCurrentSystem ? this.currentSystem  = issetCurrentSystem : this.systemService.getCurrentSystem()
    .subscribe(systems => {
      this.currentSystem = systems[0];
      this.currentSystemId = this.currentSystem.id;
      this.redirect();
    });
    if (this.currentSystemId) {
      this.redirect();
    }
  }

  redirect() {
    this.router.navigate([`system/${this.currentSystemId}/incidents`]);
  }
}
