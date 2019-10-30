import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmsSystemRecipientsComponent } from './sms-system-recipients/sms-system-recipients.component';
import { EmailSystemRecipientsComponent } from './email-system-recipients/email-system-recipients.component';
import { SystemRecipientFormComponent } from './system-recipient-create/system-recipient-create.component';
import { SystemRecipientUpdateComponent } from './system-recipient-update/system-recipient-update.component';
import { SystemRecipientsComponent } from './system-recipients.component';

const routes: Routes = [{ path: '', component: SystemRecipientsComponent, children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'email-recipient'
      },
      {
        path: 'email-recipient',
        component: EmailSystemRecipientsComponent
      },
      {
        path: 'sms-recipient',
        component: SmsSystemRecipientsComponent
      },
    ] },
    {
      path: 'recipient-create',
      component: SystemRecipientFormComponent
    },
    {
      path: 'recipient-update/:id',
      component: SystemRecipientUpdateComponent
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRecipientsRoutingModule { }
