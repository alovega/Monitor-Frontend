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
  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [55, 59, 50, 51, 56, 55, 40], label: 'My First dataset', lineTension: 0 },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public chartDataset2: Array<any> = [
    { data: [100, 100, 80, 100, 90, 100, 100], label: 'Total Availability', lineTension: 0 },
  ];

  public chartLabels: Array<any> = ['1', '2', '3', '4', '5', '6', '7'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartColors2: Array<any> = [
    {
      backgroundColor: 'rgb(5, 197, 5)',
      borderColor: 'rgb(5, 172, 5)',
      borderWidth: 2,
    }
  ] ;

  public chartOptions: any = {
    responsive: true,
    legend: {
      display: false,
   }
  };

  public chartOptions2: any = {
    responsive: true,
    scales: {
      xAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Month'
              }
          }],
      yAxes: [{
              display: true,
              ticks: {
                  beginAtZero: true,
                  steps: 10,
                  stepValue: 5,
                  max: 100
              }
          }]
    },
    title: {
        display: true,
        text: 'Availability Percentage trend'
    }
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

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
    this.systemService.getSystem<SystemResponse>(this.systemId)
    .subscribe(response => {
        if (response.ok) {
          if (response.body.code === '800.200.001') {
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
