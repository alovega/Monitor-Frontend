import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ToastrModule } from 'ngx-toastr';

import { SetupSystemRoutingModule } from './setup-system-routing.module';
import { SetupSystemComponent } from './setup-system.component';
import { AddEndpointsComponent } from './add-endpoints/add-endpoints.component';


@NgModule({
  declarations: [SetupSystemComponent, AddEndpointsComponent],
  imports: [
    CommonModule,
    SetupSystemRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  schemas: [
    NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SetupSystemModule { }
