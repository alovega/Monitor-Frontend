import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SystemStatusService } from 'src/app/shared/system-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EndpointService } from '../endpoint/endpoint.service';
import { IncidentService } from '../incidents/incident.service';
import { SystemService } from 'src/app/shared/system.service';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';
import { IncidentResponse } from '../incidents/incident';
import { SystemResponse } from 'src/app/shared/models/system';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hm-public-dashboard',
  templateUrl: './public-dashboard.component.html',
  styleUrls: ['./public-dashboard.component.scss']
})
export class PublicDashboardComponent implements OnInit {
  systemStatus: any;
  systemId: string;
  endpoints: any[];
  pastDates: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private endpointsService: EndpointService,
    private systemService: SystemService,
    private httpWrapperService: HttpWrapperService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.systemId = this.activatedRoute.snapshot.paramMap.get('system-id');
    const systemStatus = this.httpWrapperService.post<SystemResponse>('get_system_status/', {system_id: this.systemId});
    const pastIncidents = this.httpWrapperService.post<IncidentResponse>('past_incidents/', {system_id: this.systemId});
    this.systemService.getSystem<SystemResponse>(this.systemId).subscribe(
      (res) => {
        if (res.ok) {
          if (res.body.code === '800.200.001') {
            forkJoin([systemStatus, pastIncidents])
            .subscribe(results => {
              if (results[0].ok) {
                if (results[0].body.code === '800.200.001') {
                  this.systemStatus = results[0].body.data;
                } else {
                  this.toastr.error('Could not fetch system status. Try again later', 'Error');
                }
              }

              if (results[1].ok) {
                if (results[1].body.code === '800.200.001') {
                  this.pastDates = results[1].body.data;
                } else {
                  this.toastr.error('Could not fetch past incidents. Try again later', 'Error');
                }
              }
            });
          }
        } else {
          this.router.navigate(['error']);
        }
      });
    this.endpointsService.getEndpoints(this.systemId).subscribe(
      (res) => {
        this.endpoints = res;
    });
  }
}
