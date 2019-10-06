import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipientsComponent } from './recipients.component';
import { RecipientFormComponent } from './recipient-form/recipient-form.component';

const routes: Routes = [{ path: '', component: RecipientsComponent, 
children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'recipient-form'
      },
      // {
      //   path: 'endpoint',
      //   component: RecipientViewComponent
      // },
      {
        path: 'recipient-form',
        component: RecipientFormComponent
      },
    ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipientsRoutingModule { }
