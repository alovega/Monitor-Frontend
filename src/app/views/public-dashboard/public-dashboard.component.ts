import { Component, OnInit } from '@angular/core';
import { SystemStatusService } from 'src/app/shared/system-status.service';
import { ActivatedRoute } from '@angular/router';
import { EndpointService } from '../endpoint/endpoint.service';
import { IncidentService } from '../incidents/incident.service';

@Component({
  selector: 'hm-public-dashboard',
  templateUrl: './public-dashboard.component.html',
  styleUrls: ['./public-dashboard.component.scss']
})
export class PublicDashboardComponent implements OnInit {
  systemStatus: any;
  systemId: string;
  endpoints: any[];
  incidents: any[];
  constructor(
    private systemStatusService: SystemStatusService,
    private activatedRoute: ActivatedRoute,
    private endpointsService: EndpointService,
    private incidentsService: IncidentService,
  ) { }

  ngOnInit() {
    this.systemId = this.activatedRoute.snapshot.paramMap.get('system-id');
    this.systemStatusService.getCurrentStatus().subscribe(
      (status) => {
        this.systemStatus = status;
        console.log(status);
      });
    this.endpointsService.getEndpoints(this.systemId).subscribe(
      (res) => {
        this.endpoints = res;
        console.log(res);
      });
    this.incidentsService.getIncidents().subscribe(
      (incidents) => this.incidents = incidents
    );
  }

}
