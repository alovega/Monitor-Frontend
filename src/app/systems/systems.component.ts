import { Component, OnInit } from '@angular/core';

import { SystemService } from '../shared/system.service';

@Component({
  selector: 'hm-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.scss']
})
export class SystemsComponent implements OnInit {
  systems: any;
  currentSystem: any;

  constructor(
    private systemService: SystemService
  ) { }

  ngOnInit() {
    this.systems = this.systemService.getSystems().subscribe(
      (results: any) => {
        this.systems = results;
      });
    this.currentSystem = this.systems[0];
    // console.log(this.systems);
    localStorage.setItem('currentSystem', this.currentSystem);
  }
}
