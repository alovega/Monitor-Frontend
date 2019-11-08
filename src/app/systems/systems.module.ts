import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


import { SystemsRoutingModule } from './systems-routing.module';
import { SystemsComponent } from './systems.component';
import { SharedModule } from '../shared/shared.module';
import { AddSystemComponent } from './add-system/add-system.component';
import { AuthGuardService } from '../shared/helpers/auth-guard.service';

@NgModule({
  declarations: [SystemsComponent, AddSystemComponent],
  imports: [
    CommonModule,
    SystemsRoutingModule,
    SharedModule,
    SweetAlert2Module.forRoot(),
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuardService
  ],
  schemas: [
    NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SystemsModule { }
