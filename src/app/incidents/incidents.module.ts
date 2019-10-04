import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { IncidentsRoutingModule } from './incidents-routing.module';
import { IncidentsComponent } from './incidents.component';
import { OpenIncidentsComponent } from './open-incidents/open-incidents.component';


@NgModule({
  declarations: [IncidentsComponent, OpenIncidentsComponent],
  imports: [
    CommonModule,
    IncidentsRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [
    NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class IncidentsModule { }
