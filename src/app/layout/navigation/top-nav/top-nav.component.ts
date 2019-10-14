import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SystemService } from '../../../shared/system.service';

@Component({
  selector: 'hm-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  systems: any;
  currentSystem: any;
  currentSystemId: any;
  systemIsAvailable: boolean = false;

  constructor(
    private systemService: SystemService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.systemService.getSystems().subscribe(
      (result => {
        this.systems = result;
      })
    );
    let issetCurrentSystem = this.systemService.checkCurrentSystem();
    issetCurrentSystem ? this.systemService.getCurrentSystem()
    .subscribe(systems => this.currentSystem = systems[0]) : this.currentSystem  = this.systemService.checkCurrentSystem();
    this.systemIsAvailable = true;
  }

  reload(systemId: string) {
    this.systemService.setSystem(systemId).subscribe(
      (result => {
        this.currentSystem = result[0];
      })
    );
  }
}
