import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { LoginComponent } from 'src/app/views/login/login.component';
import { SignupComponent } from 'src/app/views/Signup/Signup.component';


@NgModule({
  declarations: [AuthLayoutComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBBCMBffWFPoWuR8mMDe56nDKI4A9mf55k'
    }),
    HttpClientModule,
    NgbModule,
    FormsModule,
    ShowHidePasswordModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    AuthLayoutRoutingModule
  ]
})
export class AuthLayoutModule { }
