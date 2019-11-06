import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SystemRecipientsRoutingModule } from './system-recipients-routing.module';
import { SystemRecipientsComponent } from './system-recipients.component';
import { SystemRecipientCreateComponent } from './system-recipient-create/system-recipient-create.component';
import { SystemRecipientUpdateComponent } from './system-recipient-update/system-recipient-update.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SystemRecipientsViewComponent } from './system-recipients-view/system-recipients-view.component';


@NgModule({
  declarations: [SystemRecipientsComponent, SystemRecipientCreateComponent, SystemRecipientUpdateComponent,
     SystemRecipientsViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SystemRecipientsRoutingModule,
    SharedModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: []
})
export class SystemRecipientsModule { }
