import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hm-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit {
  public chartType = 'radar';

  public chartDatasets: Array<any> = [
    {
      label: "My First dataset",
      data: [65, 59, 90, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(105, 0, 132, .2)',
      ],
      borderColor: [
        'rgba(200, 99, 132, .7)',
      ],
      borderWidth: 2
    },
    {
      label: "My Second dataset",
      data: [28, 48, 40, 19, 96, 27, 100],
      backgroundColor: [
        'rgba(0, 250, 220, .2)',
      ],
      borderColor: [
        'rgba(0, 213, 132, .7)',
      ],
      borderWidth: 2
    }
  ];

  public chartLabels: Array<any> = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  public chartColors: Array<any> = [];
  public chartOptions: any = {
    responsive: true,
  };
  constructor() { }

  ngOnInit() {
  }
}
