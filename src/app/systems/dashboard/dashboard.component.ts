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
  public systemStatus: any;

  constructor(
    public graphsService: GraphsService,
    public systemService: SystemService,
    private systemStatusService: SystemStatusService
  ) { }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.systemStatusService.getCurrentStatus().subscribe(
      (status) => {
        this.systemStatus = status;
        console.log(status);
      }
    );
    this.graphsService.getErrorRates().subscribe(
      (result => {
        this.errorRateGraph.chartLabels = result.labels;
        this.errorRateGraph.chartDatasets[0].data = result.datasets;
      })
    );
  }
}
