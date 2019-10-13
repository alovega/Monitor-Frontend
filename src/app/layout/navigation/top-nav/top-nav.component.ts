import { Component, OnInit } from '@angular/core';

import { SystemService } from '../../../shared/system.service';

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
    this.systemService.getSystems().subscribe(
      (result => this.systems = result)
    );
    this.currentSystem = localStorage.getItem('currentSystem');
  }
}
