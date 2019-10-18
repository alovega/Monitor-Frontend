import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';

import { RecipientsRoutingModule } from './recipients-routing.module';
import { RecipientsComponent } from './recipients.component';
import { RecipientFormComponent } from './recipient-create/recipient-create.component';
import { EmailRecipientsComponent } from './email-recipients/email-recipients.component';
import { SmsRecipientsComponent } from './sms-recipients/sms-recipients.component';
import { RecipientUpdateComponent } from './recipient-update/recipient-update.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RecipientsComponent, RecipientFormComponent, EmailRecipientsComponent, SmsRecipientsComponent, RecipientUpdateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipientsRoutingModule,
    MatTableModule,
    SharedModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [RecipientFormComponent, EmailRecipientsComponent, SmsRecipientsComponent, RecipientUpdateComponent]
})
export class RecipientsModule { }
