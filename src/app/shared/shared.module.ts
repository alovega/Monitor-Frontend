import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { LineGraphComponent } from './graphs/line-graph/line-graph.component';
import { BarGraphComponent } from './graphs/bar-graph/bar-graph.component';
import { PieChartComponent } from './graphs/pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './graphs/doughnut-chart/doughnut-chart.component';
import { HorizontalBarChartComponent } from './graphs/horizontal-bar-chart/horizontal-bar-chart.component';
import { RadarChartComponent } from './graphs/radar-chart/radar-chart.component';
import { DatePickerComponent } from './datetimepicker/datepicker/date.picker.component';
import { TimePickerComponent } from './datetimepicker/timepicker/time.picker.component';
import { EmptyDataComponent } from './empty-data/empty-data.component';


@NgModule({
  declarations: [
    LineGraphComponent,
    BarGraphComponent,
    PieChartComponent,
    DoughnutChartComponent,
    HorizontalBarChartComponent,
    RadarChartComponent,
    DatePickerComponent,
    TimePickerComponent,
    EmptyDataComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    WavesModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    LineGraphComponent,
    BarGraphComponent,
    PieChartComponent,
    DoughnutChartComponent,
    HorizontalBarChartComponent,
    RadarChartComponent,
    DatePickerComponent,
    TimePickerComponent,
    EmptyDataComponent
  ]
})
export class SharedModule { }
