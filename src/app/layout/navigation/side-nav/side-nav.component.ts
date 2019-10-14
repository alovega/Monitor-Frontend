import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../../shared/system.service';


@Component({
  selector: 'hm-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  currentSystemId: any;

  constructor(
    private systemService: SystemService
  ) { }

  ngOnInit() {
    this.systemService.changeSystem.subscribe(
      system => {
        let currentSystem = system[0];
        this.currentSystemId = currentSystem.id;
        console.log(this.currentSystemId);
      }
    );
  }

  setSystem(systemId: any) {

  }
}
