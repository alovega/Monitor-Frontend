import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';

import { LineGraphComponent } from './graphs/line-graph/line-graph.component';
import { BarGraphComponent } from './graphs/bar-graph/bar-graph.component';
import { PieChartComponent } from './graphs/pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './graphs/doughnut-chart/doughnut-chart.component';
import { HorizontalBarChartComponent } from './graphs/horizontal-bar-chart/horizontal-bar-chart.component';
import { RadarChartComponent } from './graphs/radar-chart/radar-chart.component';


@NgModule({
  declarations: [
    LineGraphComponent,
    BarGraphComponent,
    PieChartComponent,
    DoughnutChartComponent,
    HorizontalBarChartComponent,
    RadarChartComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    WavesModule
  ],
  exports: [
    LineGraphComponent,
    BarGraphComponent,
    PieChartComponent,
    DoughnutChartComponent,
    HorizontalBarChartComponent,
    RadarChartComponent
  ]
})
export class SharedModule { }
