import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AgmCoreModule } from '@agm/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    MDBBootstrapModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBBCMBffWFPoWuR8mMDe56nDKI4A9mf55k'
    }),
  ],
  exports: [
    DashboardComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule { }
