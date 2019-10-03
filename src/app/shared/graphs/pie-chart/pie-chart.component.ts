import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hm-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  public chartType = 'pie';

  public chartDatasets: Array<any> = [{
      data: [300, 50, 100, 40, 120],
      label: '# of Votes',
      borderWidth: 1
    }];

  public chartLabels: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

  public chartColors: Array<any> = [{
    backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
  }];

  public chartOptions: any = {
    responsive: true,
    legend: false
  };
  constructor() { }

  ngOnInit() {
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
