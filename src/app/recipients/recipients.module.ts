import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipientsRoutingModule } from './recipients-routing.module';
import { RecipientsComponent } from './recipients.component';
import { RecipientFormComponent } from './recipient-form/recipient-form.component';
import { EmailRecipientsComponent } from './email-recipients/email-recipients.component';


@NgModule({
  declarations: [RecipientsComponent, RecipientFormComponent, EmailRecipientsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipientsRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [RecipientFormComponent, EmailRecipientsComponent]
})
export class RecipientsModule { }
