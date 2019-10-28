import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Incident } from '../incident';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../shared/system.service';


@Component({
  selector: 'hm-open-incidents',
  templateUrl: './open-incidents.component.html',
  styleUrls: ['./open-incidents.component.scss']
})

export class OpenIncidentsComponent implements OnInit {
  incidents$: Observable<Incident[]>;
  currentSystem: any;
  currentSystemId: any;

  constructor(
    private systemService: SystemService,
    private incidentService: IncidentService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.currentSystemId = param['system-id'];
        console.log(this.currentSystemId);
      });

    this.systemService.setSystem(this.currentSystemId).subscribe(
      (result => {
        this.currentSystem = result[0];
        this.incidents$ = this.incidentService.getOpenIncidents(this.currentSystem);
        // console.log(this.currentSystem);
        this.incidentService.getOpenIncidents(this.currentSystem).subscribe(
          (incident) => console.log(incident)
        );
      })
    );
  }
  // showIncidents() {
  //   this.incidentService.getIncidents()
  //   .subscribe((results: Incident[]) => {
  //     this.incidents = results.filter(result => result.status !== 'Completed' && result.status !== 'Resolved' );
  //   });
  // }

}
