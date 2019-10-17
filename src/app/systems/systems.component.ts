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
    if (!this.currentSystemId) {
      this.currentSystem = this.systemService.getCurrentSystem();
      this.currentSystemId = this.currentSystem.id;
    }
    this.systemService.setSystem(this.currentSystemId).subscribe(
      systems => {
        localStorage.setItem('currentSystem', JSON.stringify(systems[0]));
      }
    );
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    // this.router.navigate([`system/${this.currentSystemId}/incidents`]));
    this.router.navigate([`system/${this.currentSystemId}/incidents`]);
  }
}
