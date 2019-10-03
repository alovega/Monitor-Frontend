import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule} from 'angular-bootstrap-md';
import { AgmCoreModule } from '@agm/core';

import { MapsRoutingModule } from './maps-routing.module';
import { MapsComponent } from './maps.component';


@NgModule({
  declarations: [MapsComponent],
  imports: [
    CommonModule,
    MapsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBBCMBffWFPoWuR8mMDe56nDKI4A9mf55k'
    }),
    MDBBootstrapModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MapsModule { }
