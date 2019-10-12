import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Incident } from '../incident';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hm-open-incidents',
  templateUrl: './open-incidents.component.html',
  styleUrls: ['./open-incidents.component.scss']
})
export class OpenIncidentsComponent implements OnInit {
  incidents$: Observable<Incident[]>;
  systemId: string;

  constructor(
    private incidentService: IncidentService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.systemId = param['system-id'];
      });
    this.incidents$ = this.incidentService.getOpenIncidents();
    // this.showIncidents();
  }

  // showIncidents() {
  //   this.incidentService.getIncidents()
  //   .subscribe((results: Incident[]) => {
  //     this.incidents = results.filter(result => result.status !== 'Completed' && result.status !== 'Resolved' );
  //   });
  // }

}
