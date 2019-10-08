import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Incident } from '../incident';

@Component({
  selector: 'hm-realtime-incidents',
  templateUrl: './realtime-incidents.component.html',
  styleUrls: ['./realtime-incidents.component.scss']
})
export class RealtimeIncidentsComponent implements OnInit {
  incidents: Incident[];

  constructor(
    private incidentService: IncidentService
  ) { }

  ngOnInit() {
    this.showRealtimeIncidents();
  }

  // TODO Replace service call with getRealtimeIncidents
  public showRealtimeIncidents() {
    return this.incidentService.getRealtimeIncidents()
    .subscribe((results: Incident[]) => {
      this.incidents = results.filter(result => result.type === 'Realtime');
    });
  }
}
