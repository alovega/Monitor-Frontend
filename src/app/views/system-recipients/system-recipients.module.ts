import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';

import { SystemRecipientsRoutingModule } from './system-recipients-routing.module';
import { SystemRecipientsComponent } from './system-recipients.component';
import { SystemRecipientCreateComponent } from './system-recipient-create/system-recipient-create.component';
import { SystemRecipientUpdateComponent } from './system-recipient-update/system-recipient-update.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SystemRecipientsComponent, SystemRecipientCreateComponent, SystemRecipientUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelect2Module,
    ReactiveFormsModule,
    SystemRecipientsRoutingModule,
    SharedModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: []
})
export class SystemRecipientsModule { }
