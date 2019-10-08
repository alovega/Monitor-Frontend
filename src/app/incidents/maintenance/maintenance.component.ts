import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Incident } from '../incident';


@Component({
  selector: 'hm-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  incidents: Incident[];

  constructor(
    private incidentService: IncidentService
  ) { }

  ngOnInit() {
    this.showMaintenanceIncidents();
  }

  public showMaintenanceIncidents() {
    this.incidentService.getScheduledIncidents()
    .subscribe((results: Incident[]) => {
      this.incidents = results.filter(result => result.type === 'Scheduled');
      });
  }

}
