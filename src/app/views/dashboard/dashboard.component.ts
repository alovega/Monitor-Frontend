import { Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbTabChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';

import { SystemService } from '../../shared/system.service';
import { GraphsService } from '../../shared/graphs.service';
import { SystemStatusService } from '../../shared/system-status.service';
import { ProfileService } from 'src/app/profile/profile.service';
import { System } from 'src/app/shared/models/system';
import { SystemStatusResponse, SystemStatus } from 'src/app/shared/models/system-status';
import { ToastrService } from 'ngx-toastr';
import { WidgetData, WidgetDataResponse } from './widget-data';
import { GraphDataResponse } from 'src/app/shared/models/graph-data';

@Component({
  selector: 'hm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewChecked, AfterViewInit {
  currentSystem: System;
  message: any;
  widgetData: WidgetData;
  activeTab: string;
  startDate: Date;
  endDate: Date;
  loading = true;
  graphChanges: any;
  systemStatus: SystemStatus;
  @ViewChild('tabs', {static: false}) tabs: NgbTabset;

  public errorRateGraph = {
    chartType: 'line',
    chartDatasets: [
      { data: []},
    ],
    chartLabels: [],
    chartColors: [
      {
        borderColor: 'rgba(200, 99, 132, .7)',
        borderWidth: 2,
      }
    ],
    chartOptions: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Number of errors'
          }
        }]
      },
      legend: {
        display: false
      },
      // elements: {
      //   line: {
      //       tension: 0
      //   }
      // }
    }
  };
  public responseTimeGraph = {
    chartType: 'line',
    chartDatasets: [],
    chartLabels: [],
    chartColors: [
      {
        borderColor: 'rgba(200, 99, 132, .7)',
        borderWidth: 2,
      },
      {
        borderColor: 'rgba(0, 10, 130, .7)',
        borderWidth: 2,
      },
      {
        borderColor: 'rgba(91, 127, 0, 0.7)',
        borderWidth: 2,
      },
      {
        borderColor: 'rgba(255, 255, 0, 1.0)',
        borderWidth: 2,
      },
    ],
    chartOptions: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Response time in seconds'
          }
        }]
      }
    }
  };

  constructor(
    public graphsService: GraphsService,
    public systemService: SystemService,
    private systemStatusService: SystemStatusService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
  ) {
    this.activeTab = 'today';
  }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.systemStatusService.getCurrentStatus<SystemStatusResponse>().subscribe(
      (response) => {
        if (response.ok) {
          if (response.body.code === '800.200.001') {
            this.systemStatus = response.body.data;
          } else {
            this.toastr.error('Error Fetching current status', 'Error!');
          }
        }
    });
    this.getWidgetData(this.activeTab);
    this.profileService.getLoggedInuserRecentNotifications().subscribe(
      (data) => {
        this.message = data;
    });
  }


  public getWidgetData(duration: string) {
    this.widgetData = new WidgetData();
    const today = new Date();
    this.endDate = new Date(new Date().setHours(0, 0, 0, 0));
    this.startDate = new Date(today.setDate(today.getDate() + 1));
    this.startDate = new Date(this.startDate.setHours(0, 0, 0, 0));

    if (duration === 'week') {
      this.endDate = new Date(this.endDate.setDate(this.endDate.getDate() - 6));
    } else if (duration === 'month') {
      this.endDate = new Date(this.endDate.setDate(this.endDate.getDate() - 30));
    } else if (duration === 'year') {
      this.endDate = new Date(this.endDate.setDate(this.endDate.getDate() - 364));
    } else {
      this.endDate = this.endDate;
    }
    this.systemStatusService.getDashboardWidgetsData<WidgetDataResponse>(this.startDate, this.endDate)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.widgetData = response.body.data;
        } else {
          this.toastr.error('Error while fetching widgets data', 'Error!');
        }
      } else {
        // TODO: Add error checks
      }
    });

    this.graphsService.getErrorRates<GraphDataResponse>(this.startDate, this.endDate)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.errorRateGraph.chartLabels = response.body.data.labels;
          this.errorRateGraph.chartDatasets[0].data = response.body.data.datasets;
          this.graphChanges = response.body.data;
          this.loading = false;
        } else {
          this.toastr.error('Failed to retrieve Error rates graph data', 'Get graph data error');
        }
      } else {
        // TODO: Add error checks
      }
    });
    this.graphsService.getResponseTimes<GraphDataResponse>(this.startDate, this.endDate)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          Object.keys(response.body.data.datasets).forEach(key => {
            this.responseTimeGraph.chartDatasets.push(response.body.data.datasets[key]);
            this.responseTimeGraph.chartLabels.push(...response.body.data.datasets[key].data);
          });
          this.responseTimeGraph.chartLabels = response.body.data.labels;
          this.graphChanges = {
            labels: response.body.data.labels,
            datasets: this.responseTimeGraph.chartDatasets
          };
        } else {
          this.toastr.error('Failed to retrieve Response times graph data', 'Get graph data error');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.tabs) {
      this.tabs.select(this.activeTab);
    }
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  onTabChange($event: NgbTabChangeEvent) {
    if (this.tabs) {
      this.activeTab = $event.nextId;
      this.getWidgetData(this.activeTab);
    }
  }
}
