import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Incident } from '../incident';
import { Observable } from 'rxjs';

@Component({
  selector: 'hm-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  incidents$: Observable<Incident[]>;
  incidents: Incident[];

  constructor(
    private incidentService: IncidentService
  ) { }

  ngOnInit() {
    this.incidents$ = this.incidentService.getScheduledIncidents();
    this.showMaintenanceIncidents();
  }

  public showMaintenanceIncidents() {
    this.incidentService.getIncidents()
    .subscribe((results: Incident[]) => {
      this.incidents = results.filter(result => result.type === 'Scheduled');
      });
  }

}
