import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { SystemService } from '../../shared/system.service';
import { GraphsService } from './graphs.service';
import { SystemStatusService } from './system-status.service';

@Component({
  selector: 'hm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentSystem: any;
  currentSystemId: any;
  data: any;
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
        backgroundColor: 'rgba(105, 0, 132, .2)',
        borderColor: 'rgba(200, 99, 132, .7)',
        borderWidth: 2,
      },
      {
        backgroundColor: 'rgba(0, 137, 132, .2)',
        borderColor: 'rgba(0, 10, 130, .7)',
        borderWidth: 2,
      },
      {
        backgroundColor: 'rgba(109, 137, 132, .2)',
        borderColor: 'rgba(91, 127, 0, 0.7)',
        borderWidth: 2,
      },
      {
        backgroundColor: 'rgba(109, 137, 132, .2)',
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
            labelString: 'System Status per hour'
          }
        }]
      }
    }
  };
  systemId: any;

  constructor(
    public graphsService: GraphsService,
    public systemService: SystemService,
    private systemStatusService: SystemStatusService
  ) { }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.systemId = this.currentSystem.id;
    this.graphsService.getErrorRates().subscribe(
      (result => {
        this.errorRateGraph.chartLabels = result.labels;
        this.errorRateGraph.chartDatasets[0].data = result.datasets;
      })
    );

    this.graphsService.getSystemStatus(this.systemId).subscribe(
      (response) => {
        this.data = [];
        Object.keys(response.datasets).forEach(key => {
          this.responseTimeGraph.chartDatasets.push(response.datasets[key]);
          this.responseTimeGraph.chartLabels.push(response.datasets[key].data)
          console.log(this.responseTimeGraph.chartLabels.concat(response.datasets[key].chartLabels));
          console.log(response.datasets[key].data);
        });
        this.responseTimeGraph.chartLabels = response.labels;
        console.log(this.responseTimeGraph.chartLabels);
      });
  }
}
