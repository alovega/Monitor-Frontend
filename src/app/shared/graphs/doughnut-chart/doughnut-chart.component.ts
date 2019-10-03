import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hm-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  public chartType = 'doughnut';

  public chartDatasets: Array<any> = [
    {
      data: [300, 50, 100, 40, 120]
    }
  ];

  public chartLabels: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];
  public chartColors: Array<any> = [{
    backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
    hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774']
  }];
  public chartOptions: any = {
    responsive: true,
  };
  constructor() { }

  ngOnInit() {
  }

}
