import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Incident } from '../incident';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../shared/system.service';

@Component({
  selector: 'hm-realtime-incidents',
  templateUrl: './realtime-incidents.component.html',
  styleUrls: ['./realtime-incidents.component.scss']
})
export class RealtimeIncidentsComponent implements OnInit {
  incidents$: Observable<Incident[]>;
  systemId: string;
  currentSystem: any;

  constructor(
    private incidentService: IncidentService,
    private activatedRoute: ActivatedRoute,
    private systemService: SystemService
  ) { }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.systemId = this.currentSystem.id;
    this.incidents$ = this.incidentService.getRealtimeIncidents();
  }

  // TODO Replace service call with getRealtimeIncidents
  // public showRealtimeIncidents() {
  //   return this.incidentService.getIncidents()
  //   .subscribe((results: any[]) => {
  //     console.log(results);
  //     this.incidents$ = results.filter(result => result.type === 'Realtime');
  //   });
  // }
}
