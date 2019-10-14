import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipientsComponent } from './recipients.component';
import { RecipientFormComponent } from './recipient-create/recipient-create.component';
import { EmailRecipientsComponent } from './email-recipients/email-recipients.component';
import { SmsRecipientsComponent } from './sms-recipients/sms-recipients.component';
import { RecipientUpdateComponent } from './recipient-update/recipient-update.component';

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
        path: 'recipient-create',
        component: RecipientFormComponent
      },
      {
        path: 'recipient-update/:id',
        component: RecipientUpdateComponent
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
