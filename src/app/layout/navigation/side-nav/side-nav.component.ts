import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../../shared/system.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hm-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  currentSystemId: any;
  currentSystem: any;
  incidentsUrl = `/system/{{currentSystemId}}/incidents`;
  constructor(
    private systemService: SystemService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.systemService.changeSystem.subscribe(
      systems => {
        let currentSystem = systems[0];
        this.currentSystemId = currentSystem.id;
      }
    );

    let issetCurrentSystem = this.systemService.checkCurrentSystem();
    issetCurrentSystem ? this.systemService.getCurrentSystem()
    .subscribe(systems => this.currentSystemId = systems[0].id) : this.currentSystemId  = this.systemService.checkCurrentSystem();
    // this.currentSystemId = this.currentSystem.id;
    // console.log(this.currentSystemId);
  }

  isActive(path) {
    return this.location.path().indexOf(path) > -1;
  }
}
