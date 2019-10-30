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
    this.currentSystem = this.systemService.getCurrentSystem();
    this.systemId = this.currentSystem.id;
    this.incidents$ = this.incidentService.getScheduledIncidents();
    // this.showMaintenanceIncidents();
  }

  // public showMaintenanceIncidents() {
  //   this.incidentService.getIncidents()
  //   .subscribe((results: Incident[]) => {
  //     this.incidents = results.filter(result => result.type === 'Scheduled');
  //     });
  // }

}
