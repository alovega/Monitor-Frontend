import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsComponent } from './notifications.component';
import { EmailNotificationComponent } from './email-notification/email-notification.component';
import { SmsNotificationsComponent } from './sms-notifications/sms-notifications.component';
import { AuthGuardService } from 'src/app/shared/helpers/auth-guard.service';

const routes: Routes = [{ path: '', component: NotificationsComponent, canActivateChild: [AuthGuardService],
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
