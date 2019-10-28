import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsComponent } from './notifications.component';
import { EmailNotificationComponent } from './email-notification/email-notification.component';
import { SmsNotificationsComponent } from './sms-notifications/sms-notifications.component';

const routes: Routes = [{ path: '', component: NotificationsComponent,
children: [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'email-notification'
  },
  {
    path: 'email-notification',
    component: EmailNotificationComponent
  },
  {
    path: 'sms-notification',
    component: SmsNotificationsComponent
  }]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
