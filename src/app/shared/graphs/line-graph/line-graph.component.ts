import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'hm-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit, OnChanges {
  public chartType = 'line';
  @Input() chartData;

  public chartDatasets;
  public chartLabels;
  public chartColors;
  public chartOptions;
  constructor() { }

  ngOnInit() {
    this.chartDatasets = this.chartData.chartDatasets;
    this.chartLabels = this.chartData.chartLabels;
    this.chartColors = this.chartData.chartColors;
    this.chartOptions = this.chartData.chartOptions;
    console.log(this.chartDatasets, this.chartData.chartDatasets);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.chartData.currentValue);
    if (changes.chartData.currentValue) {
        this.chartData = changes.chartData.currentValue;
        this.chartDatasets = this.chartData.chartDataSets;
        this.chartLabels = this.chartData.chartLabels;
    }
  }
}
