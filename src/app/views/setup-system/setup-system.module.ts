import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SetupSystemRoutingModule } from './setup-system-routing.module';
import { SetupSystemComponent } from './setup-system.component';
import { AddEndpointsComponent } from './add-endpoints/add-endpoints.component';
import { AddRulesComponent } from './add-rules/add-rules.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SetupSystemComponent, AddEndpointsComponent, AddRulesComponent],
  imports: [
    CommonModule,
    SetupSystemRoutingModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    SharedModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SetupSystemModule { }
