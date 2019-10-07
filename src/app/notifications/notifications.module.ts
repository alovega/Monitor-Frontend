import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { EmailNotificationComponent } from './email-notification/email-notification.component';
import { SmsNotificationsComponent } from './sms-notifications/sms-notifications.component';


@NgModule({
  declarations: [NotificationsComponent, EmailNotificationComponent, SmsNotificationsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule
  ],
  exports: [EmailNotificationComponent, SmsNotificationsComponent]
})
export class NotificationsModule { }
