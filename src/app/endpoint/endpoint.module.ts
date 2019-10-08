import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { EndpointRoutingModule } from './endpoint-routing.module';
import { EndpointComponent } from './endpoint.component';
import { EndpointFormComponent } from './endpoint-form/endpoint-form.component';
import { EndpointViewComponent } from './endpoint-view/endpoint-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [EndpointComponent, EndpointViewComponent, EndpointFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EndpointRoutingModule,
    MDBBootstrapModule.forRoot(),
    SharedModule
  ]
})
export class EndpointModule { }
