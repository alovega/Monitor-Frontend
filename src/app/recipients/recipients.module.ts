import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [RecipientsComponent, RecipientFormComponent, EmailRecipientsComponent, SmsRecipientsComponent, RecipientUpdateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipientsRoutingModule,
    MatTableModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [RecipientFormComponent, EmailRecipientsComponent, SmsRecipientsComponent, RecipientUpdateComponent]
})
export class RecipientsModule { }
