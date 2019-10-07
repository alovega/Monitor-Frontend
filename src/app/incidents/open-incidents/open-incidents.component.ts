import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Incident } from '../incident';

@Component({
  selector: 'hm-open-incidents',
  templateUrl: './open-incidents.component.html',
  styleUrls: ['./open-incidents.component.scss']
})
export class OpenIncidentsComponent implements OnInit {
  incidents: Incident[];

  constructor(
    private incidentService: IncidentService
  ) { }

  ngOnInit() {
    this.showIncidents();
  }

  showIncidents() {
    this.incidentService.getIncidents()
    .subscribe((results: Incident[]) => {
      this.incidents = results.filter(result => result.status !== 'Completed' && result.status !== 'Resolved' );
    });
  }

}
