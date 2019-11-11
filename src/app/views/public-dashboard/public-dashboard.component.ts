import { Component, OnInit } from '@angular/core';
import { SystemStatusService } from 'src/app/shared/system-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EndpointService } from '../endpoint/endpoint.service';
import { IncidentService } from '../incidents/incident.service';
import { SystemService } from 'src/app/shared/system.service';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';

@Component({
  selector: 'hm-public-dashboard',
  templateUrl: './public-dashboard.component.html',
  styleUrls: ['./public-dashboard.component.scss']
})
export class PublicDashboardComponent implements OnInit {
  systemStatus: any;
  systemId: string;
  endpoints: any[];
  pastDates: any[];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private endpointsService: EndpointService,
    private systemService: SystemService,
    private httpWrapperService: HttpWrapperService
  ) { }

  ngOnInit() {
    this.systemId = this.activatedRoute.snapshot.paramMap.get('system-id');
    this.systemService.getSystem(this.systemId).subscribe(
      (res) => {
        if (res) {
          this.httpWrapperService.post('get_system_status/', {system_id: this.systemId}).subscribe(
            (status) => this.systemStatus = status
          );
          this.httpWrapperService.post('past_incidents/', {system_id: this.systemId}).subscribe(
            (dates) => this.pastDates = dates
          );
        } else {
          this.router.navigate(['/error']);
        }
      });
    this.endpointsService.getEndpoints(this.systemId).subscribe(
      (res) => {
        this.endpoints = res;
      });
  }

}
