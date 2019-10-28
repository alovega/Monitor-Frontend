import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { SystemService } from '../../shared/system.service';
import { GraphsService } from './graphs.service';

@Component({
  selector: 'hm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentSystem: any;
  currentSystemId: any;
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

  public systemStatusGraph = {
    chartType: 'bar',
    chartDatasets: [
      { data: [], label: 'System Status per hour' },
    ],
    chartLabels: [],
    chartColors: [
      {
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255,99,132,1)',],
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
            labelString: 'System Status per hour'
          }
        }]
      }
    }
  };

  constructor(
    public graphsService: GraphsService,
    public systemService: SystemService
  ) { }

  ngOnInit() {
    console.log('Init');
    this.graphsService.getErrorRates().subscribe(
      (result => {
        this.errorRateGraph.chartLabels = result.labels;
        this.errorRateGraph.chartDatasets[0].data = result.datasets;
      })
    );

    this.graphsService.getSystemStatus().subscribe(
      (result => {
        this.systemStatusGraph.chartLabels = result.labels;
        this.systemStatusGraph.chartDatasets[0].data = result.datasets;
        console.log(this.systemStatusGraph.chartDatasets[0])
      })
    );
  }
}
