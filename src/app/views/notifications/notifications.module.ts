import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { EmailNotificationComponent } from './email-notification/email-notification.component';
import { SmsNotificationsComponent } from './sms-notifications/sms-notifications.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [NotificationsComponent, EmailNotificationComponent, SmsNotificationsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    FormsModule,
    SharedModule,
    NgxDatatableModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: [EmailNotificationComponent, SmsNotificationsComponent]
})
export class NotificationsModule { }
