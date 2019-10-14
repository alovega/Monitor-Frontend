import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Incident } from '../incident';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../shared/system.service';

@Component({
  selector: 'hm-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  incidents$: Observable<Incident[]>;
  incidents: Incident[];
  systemId: string;
  currentSystem: any;

  constructor(
    private incidentService: IncidentService,
    private activatedRoute: ActivatedRoute,
    private systemService: SystemService
  ) {

   }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.systemId = param['system-id'];
        console.log(this.systemId);
      });

    this.systemService.setSystem(this.systemId).subscribe(
      (result => {
        this.currentSystem = result[0];
        this.incidents$ = this.incidentService.getOpenIncidents(this.currentSystem);
        console.log(this.currentSystem);
      })
    );
    this.incidents$ = this.incidentService.getScheduledIncidents(this.currentSystem);
    // this.showMaintenanceIncidents();
  }

  // public showMaintenanceIncidents() {
  //   this.incidentService.getIncidents()
  //   .subscribe((results: Incident[]) => {
  //     this.incidents = results.filter(result => result.type === 'Scheduled');
  //     });
  // }

}
