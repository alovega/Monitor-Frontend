import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { SetupUserRoutingModule } from './setup-user-routing.module';
import { SetupUserComponent } from './setup-user.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatStepperModule } from '@angular/material';
import { UpdateUserComponent } from './update-user/update-user.component';


@NgModule({
  declarations: [SetupUserComponent, UpdateUserComponent],
  imports: [
    CommonModule,
    SetupUserRoutingModule,
    FormsModule,
    NgbModule,
    NgSelect2Module,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    SharedModule,
    MatStepperModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [UpdateUserComponent]
})
export class SetupUserModule { }
