import { Component, OnInit } from '@angular/core';

import { SystemService } from '../../../systems/system.service';

@Component({
  selector: 'hm-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  systems: any;
  currentSystem: any;

  constructor(
    private systemService: SystemService,
  ) { }

  ngOnInit() {
    this.systems = this.systemService.getSystems();
    console.log(this.systems);
    this.currentSystem = localStorage.getitem('currentSystem');
  }

}
