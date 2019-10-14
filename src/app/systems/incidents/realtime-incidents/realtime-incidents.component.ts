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
  currentSystem: string;

  constructor(
    private incidentService: IncidentService,
    private activatedRoute: ActivatedRoute,
    private systemService: SystemService
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.systemId = param['system-id'];
      });

    this.systemService.setSystem(this.systemId).subscribe(
      (result => {
        this.currentSystem = result[0];
        this.incidents$ = this.incidentService.getOpenIncidents(this.currentSystem);
      })
    );
    this.incidents$ = this.incidentService.getRealtimeIncidents(this.currentSystem);
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
