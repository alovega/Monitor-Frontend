import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { SystemService } from '../../shared/system.service';
import { GraphsService } from '../../shared/graphs.service';
import { SystemStatusService } from '../../shared/system-status.service';
import { ProfileService } from 'src/app/profile/profile.service';

@Component({
  selector: 'hm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentSystem: any;
  currentSystemId: any;
  message: any;
  widgetData: any;
  public systemStatus: any;

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
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.systemStatusService.getCurrentStatus().subscribe(
      (status) => {
        this.systemStatus = status;
    });
    this.systemStatusService.getDashboardWidgetsData().subscribe(
      (response) => {
        this.widgetData = response;
        console.log(response);
    });
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
}
