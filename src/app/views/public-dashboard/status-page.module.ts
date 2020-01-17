import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { StatusPageRoutingModule } from './status-page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IncidentHistoryComponent } from './incident-history/incident-history.component';
import { StatusPageComponent } from './status-page.component';


@NgModule({
  declarations: [IncidentHistoryComponent, StatusPageComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    StatusPageRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module,
    NgbModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [IncidentHistoryComponent, StatusPageComponent]
})
export class StatusPageModule { }
