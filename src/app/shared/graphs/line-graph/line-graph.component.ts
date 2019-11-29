import { Component, OnInit, Input, OnChanges, AfterViewInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'hm-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit, OnChanges, AfterViewInit {
  public chartType = 'line';
  @Input() chartData;
  @Input() graphChanges;
  public chartDatasets;
  public chartLabels;
  public chartColors;
  public chartOptions;
  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.chartDatasets = this.chartData.chartDatasets;
    this.chartLabels = this.chartData.chartLabels;
    this.chartColors = this.chartData.chartColors;
    this.chartOptions = this.chartData.chartOptions;
    // console.log(this.graphChanges);
  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
      console.log(changes);
      if (changes.graphChanges) {
        console.log(changes.graphChanges.currentValue);
        this.chartData.chartLabels = changes.graphChanges.currentValue.labels;
        this.chartData.chartDatasets[0].data = changes.graphChanges.currentValue.datasets;
        this.chartDatasets = this.chartData.chartDatasets;
        this.chartLabels = this.chartData.chartLabels;
      }
  }
}
