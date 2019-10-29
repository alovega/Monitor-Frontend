import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';

import { SystemRecipientsRoutingModule } from './system-recipients-routing.module';
import { SystemRecipientsComponent } from './system-recipients.component';
import { SystemRecipientFormComponent } from './system-recipient-create/system-recipient-create.component';
import { EmailSystemRecipientsComponent } from './email-system-recipients/email-system-recipients.component';
import { SmsSystemRecipientsComponent } from './sms-system-recipients/sms-system-recipients.component';
import { SystemRecipientUpdateComponent } from './system-recipient-update/system-recipient-update.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SystemRecipientsComponent, SystemRecipientFormComponent, EmailSystemRecipientsComponent, SmsSystemRecipientsComponent,
     SystemRecipientUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SystemRecipientsRoutingModule,
    MatTableModule,
    SharedModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [SystemRecipientFormComponent, EmailSystemRecipientsComponent, SmsSystemRecipientsComponent, SystemRecipientUpdateComponent]
})
export class SystemRecipientsModule { }
