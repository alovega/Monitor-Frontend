import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Incident } from '../incident';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hm-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  incidents$: Observable<Incident[]>;
  incidents: Incident[];
  systemId: string;
  constructor(
    private incidentService: IncidentService,
    private activatedRoute: ActivatedRoute
  ) {

   }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.systemId = param['system-id'];
        console.log(this.systemId);
      });
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
