import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { EndpointRoutingModule } from './endpoint-routing.module';
import { EndpointComponent } from './endpoint.component';
import { EndpointFormComponent } from './endpoint-form/endpoint-form.component';
import { EndpointViewComponent } from './endpoint-view/endpoint-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EndpointUpdateComponent } from './endpoint-update/endpoint-update.component';


@NgModule({
  declarations: [EndpointComponent, EndpointViewComponent, EndpointFormComponent, EndpointUpdateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EndpointRoutingModule,
    MDBBootstrapModule.forRoot(),
    SharedModule
  ],
  schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: []
})
export class EndpointModule { }
