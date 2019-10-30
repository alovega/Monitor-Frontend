import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { LineGraphComponent } from './graphs/line-graph/line-graph.component';
import { BarGraphComponent } from './graphs/bar-graph/bar-graph.component';
import { PieChartComponent } from './graphs/pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './graphs/doughnut-chart/doughnut-chart.component';
import { HorizontalBarChartComponent } from './graphs/horizontal-bar-chart/horizontal-bar-chart.component';
import { RadarChartComponent } from './graphs/radar-chart/radar-chart.component';
import { DatePickerComponent } from './datetimepicker/datepicker/date.picker.component';
import { TimePickerComponent } from './datetimepicker/timepicker/time.picker.component';
import { EmptyDataComponent } from './empty-data/empty-data.component';
import { HttpInterceptorService } from './helpers/http-interceptor.service';

import { SystemService } from './system.service';
import { LoaderComponent } from './loader/loader.component';
import { DeleteSwalComponent } from './alerts/delete-swal/delete-swal.component';
import { LoginComponent } from './auth/login/login.component';
import { ComponentLoaderComponent } from './component-loader/component-loader.component';
import { SideNavToggleService } from './side-nav-toggle.service';
import { HttpWrapperService } from './helpers/http-wrapper.service';

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
    EmptyDataComponent,
    LoaderComponent,
    DeleteSwalComponent,
    LoginComponent,
    ComponentLoaderComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    WavesModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    MDBBootstrapModule
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
    EmptyDataComponent,
    LoaderComponent,
    DeleteSwalComponent,
    LoginComponent,
    ComponentLoaderComponent
  ],
  providers: [SystemService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    SideNavToggleService,
    HttpWrapperService
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
