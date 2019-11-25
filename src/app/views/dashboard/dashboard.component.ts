import { Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { NgbTabChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { SystemService } from '../../shared/system.service';
import { GraphsService } from '../../shared/graphs.service';
import { SystemStatusService } from '../../shared/system-status.service';
import { ProfileService } from 'src/app/profile/profile.service';
import { System, SystemResponse, SystemsResponse } from 'src/app/shared/models/system';
import { SystemStatusResponse, SystemStatus } from 'src/app/shared/models/system-status';
import { ToastrService } from 'ngx-toastr';
import { WidgetData, WidgetDataResponse } from './widget-data';

@Component({
  selector: 'hm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewChecked, AfterViewInit {
  currentSystem: System;
  currentSystemId: any;
  message: any;
  widgetData: WidgetData;
  activeTab: string;
  startDate: Date;
  endDate: Date;
  loading = true;
  public systemStatus: SystemStatus;
  @ViewChild('tabs', {static: false}) tabs: NgbTabset;

  public errorRateGraph = {
    chartType: 'line',
    chartDatasets: [
      { data: [], label: 'Error rate per hour' },
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
            labelString: 'Number of errors in an hour'
          }
        }]
      }
    }
  };
  public responseTimeGraph = {
    chartType: 'bar',
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
    private cd: ChangeDetectorRef
  ) {
    this.activeTab = 'today';
  }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.systemStatusService.getCurrentStatus().subscribe(
      (res: SystemStatusResponse) => {
        if (res.code === '800.200.001') {
          this.systemStatus = res.data;
        } else {
          this.toastr.error('Error Fetching current status', 'Error!');
        }
    });
    this.getWidgetData(this.activeTab);
    this.profileService.getLoggedInuserRecentNotifications().subscribe(
        (data) => {
          this.message = data;
    });
    this.graphsService.getErrorRates().subscribe(
      (response => {
        this.errorRateGraph.chartLabels = response.labels;
        this.errorRateGraph.chartDatasets[0].data = response.datasets;
      })
    );

    this.graphsService.getResponseTimes(this.currentSystem.id).subscribe(
      (response) => {
        Object.keys(response.datasets).forEach(key => {
          this.responseTimeGraph.chartDatasets.push(response.datasets[key]);
          this.responseTimeGraph.chartLabels.push(response.datasets[key].data);
        });
        this.responseTimeGraph.chartLabels = response.labels;
      });
  }

  public getWidgetData(duration: string) {
    this.widgetData = new WidgetData();
    let today = new Date();
    this.endDate = new Date(new Date().setHours(0, 0, 0, 0));
    this.startDate = new Date(today.setDate(today.getDate() + 1));
    this.startDate = new Date(this.startDate.setHours(0, 0, 0, 0));

    if (duration === 'week') {
      this.endDate = new Date(this.endDate.setDate(this.endDate.getDate() - 7));
    } else if (duration === 'month') {
      this.endDate = new Date(this.endDate.setDate(this.endDate.getDate() - today.getDate()));
    } else if (duration === 'year') {
      this.endDate = new Date(this.startDate.getFullYear(), 0, 1, 0);
    } else {
      this.endDate = this.endDate;
    }
    this.systemStatusService.getDashboardWidgetsData(this.startDate, this.endDate).subscribe(
      (res: WidgetDataResponse) => {
        if (res.code === '800.200.001') {
          this.widgetData = res.data;
        } else {
          this.toastr.error('Error while fetching widgets data', 'Error!');
        }
    });
  }

  ngAfterViewChecked(): void {
    if (this.tabs) {
      this.tabs.select(this.activeTab);
    }
  }

  ngAfterViewInit() {
    this.loading = false;
  }

  onTabChange($event: NgbTabChangeEvent) {
    // console.log($event.nextId);
    if (this.tabs) {
      // if ()
      this.activeTab = $event.nextId;
      this.getWidgetData(this.activeTab);
      // this.router.navigate([`dashboard/quick-setup/${$event.nextId}`]);
    }
  }
}
