import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { EmailNotificationComponent } from './email-notification/email-notification.component';


@NgModule({
  declarations: [NotificationsComponent, EmailNotificationComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule
  ],
  exports: [EmailNotificationComponent]
})
export class NotificationsModule { }
