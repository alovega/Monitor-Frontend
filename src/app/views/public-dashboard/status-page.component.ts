import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { forkJoin, BehaviorSubject } from 'rxjs';
import { SystemStatusService } from 'src/app/shared/system-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EndpointService } from '../endpoint/endpoint.service';
import { IncidentService } from '../incidents/incident.service';
import { SystemService } from 'src/app/shared/system.service';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';
import { IncidentResponse } from '../incidents/incident';
import { SystemResponse, System } from 'src/app/shared/models/system';
import { ToastrService } from 'ngx-toastr';
import { GraphsService } from 'src/app/shared/graphs.service';
import { GraphDataResponse } from 'src/app/shared/models/graph-data';
import { AvailabilitySummary } from 'src/app/shared/models/availability-summary';
import { StatusPageService } from './status-page.service';
import { NgbTabset, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hm-status-page',
  templateUrl: './status-page.component.html',
  styleUrls: ['./status-page.component.scss']
})
export class StatusPageComponent implements OnInit, AfterViewInit, AfterViewChecked {
  systemStatus: any;
  systemId: string;
  endpoints: any[];
  availabilitySummary: AvailabilitySummary;
  pastDates: any;
  graphChanges: any;
  @ViewChild('metricTabs', {static: false}) tabs: NgbTabset;
  activeTab: string;
  availabilitySummaryReady: boolean = false;
  availabilityTrendGraphReady: boolean = false;
  public chartType: string = 'line';
  public availabilityTrendGraph = {
    chartType: 'line',
    chartDatasets: [
      { data: []},
    ],
    chartLabels: [],
    chartColors: [
      {
        backgroundColor: 'rgb(5, 197, 5)',
        borderColor: 'rgb(5, 172, 5)',
        borderWidth: 2,
      }
    ],
    chartOptions: {
      responsive: true,
      scales: {
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
      },
      legend: {
        display: false
      },
      elements: {
        line: {
            tension: 0
        }
      }
    }
  };

  public chartDatasets: Array<any> = [
    { data: [55, 59, 50, 51, 56, 55, 40], label: 'My First dataset', lineTension: 0 },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public chartLabels: Array<any> = ['1', '', '2', '', '3', '', '4', '', '5', '', '6', ''];

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

  public chartOptions: any = {
    responsive: true,
    legend: {
      display: false,
   },
   scales: {
    xAxes: [{
      categoryPercentage: 1.0,
      barPercentage: 1.0
      }],
      yAxes: [{
        ticks: {
            beginAtZero: true
        }
    }]
   }
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private statusPageService: StatusPageService,
    private endpointsService: EndpointService,
    private systemService: SystemService,
    private httpWrapperService: HttpWrapperService,
    private toastr: ToastrService,
    private graphsService: GraphsService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.activeTab = 'week';
  }

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
                  this.statusPageService.currentSystemSubject.next(results[0].body.data);
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

    this.endpointsService.getEndpoints<any>(this.systemId)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.endpoints = response.body.data;
        } else {
          this.toastr.error('Failed to retrieve Services', 'Get services error');
        }
      }
    });

    this.getMetrics(this.activeTab);
    this.getWidgetsData(this.activeTab);
  }

  public getWidgetsData(activeTab: string) {
    this.statusPageService.getAvailabilitySummary<any>(this.systemId, activeTab)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.availabilitySummary = response.body.data;
          this.availabilitySummaryReady = true;
        } else {
          // Error
        }
      }
    });
  }

  public getMetrics(activeTab: string) {
    this.graphsService.getSystemAvailabilityTrend<GraphDataResponse>(this.systemId, activeTab)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.availabilityTrendGraph.chartLabels = response.body.data.labels;
          this.availabilityTrendGraph.chartDatasets[0].data = response.body.data.datasets;
          this.graphChanges = response.body.data;
          this.availabilityTrendGraphReady = true;
          // this.loading = false;
        } else {
          this.toastr.error('Failed to retrieve Error rates graph data', 'Get graph data error');
        }
      } else {
        // TODO: Add error checks
      }
    });
    // TODO: Add graphService call to fetch response times
  }

  ngAfterViewChecked(): void {
    if (this.tabs) {
      this.tabs.select(this.activeTab);
    }
  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }

  onMetricTabChange($event: NgbTabChangeEvent) {
    if (this.tabs) {
      this.activeTab = $event.nextId;
      this.availabilityTrendGraphReady = false;
      setTimeout(() => {
        this.getMetrics(this.activeTab);
      }, 500 );
    }
  }

  onWidgetTabChange($event: NgbTabChangeEvent) {
    if (this.tabs) {
      this.activeTab = $event.nextId;
      this.availabilitySummaryReady = false;
      setTimeout(() => {
        this.getWidgetsData(this.activeTab);
      }, 200);
    }
  }
}
