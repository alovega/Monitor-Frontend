import { Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'hm-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit, OnChanges {
  public chartType = 'bar';
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

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
