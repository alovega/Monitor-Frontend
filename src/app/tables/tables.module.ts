import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';


@NgModule({
  declarations: [TablesComponent],
  imports: [
    CommonModule,
    TablesRoutingModule,
    MDBBootstrapModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TablesModule { }
