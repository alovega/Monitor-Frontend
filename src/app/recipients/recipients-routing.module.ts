import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipientsComponent } from './recipients.component';
import { RecipientFormComponent } from './recipient-form/recipient-form.component';
import { EmailRecipientsComponent } from './email-recipients/email-recipients.component';
import { SmsRecipientsComponent } from './sms-recipients/sms-recipients.component';

const routes: Routes = [{ path: '', component: RecipientsComponent, 
children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'email-recipient'
      },
      {
        path: 'email-recipient',
        component: EmailRecipientsComponent
      },
      {
        path: 'recipient-form',
        component: RecipientFormComponent
      },
      {
        path: 'sms-recipient',
        component: SmsRecipientsComponent
      }
    ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipientsRoutingModule { }
