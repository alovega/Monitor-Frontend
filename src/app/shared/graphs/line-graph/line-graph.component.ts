import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hm-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit {
  public chartType = 'line';

  public chartDatasets: Array<any> = [
    {
      label: 'My First dataset',
      backgroundColor: [
        'rgba(105, 0, 132, .2)',
      ],
      borderColor: [
        'rgba(200, 99, 132, .7)',
      ],
      borderWidth: 2,
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: 'My Second dataset',
      backgroundColor: [
        'rgba(0, 137, 132, .2)',
      ],
      borderColor: [
        'rgba(0, 10, 130, .7)',
      ],
      data: [28, 48, 40, 19, 86, 27, 90]
    }
  ];

  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public chartColors: Array<any> = [];
  public chartOptions: any = {
    responsive: true,
  };
  constructor() { }

  ngOnInit() {
  }

}
