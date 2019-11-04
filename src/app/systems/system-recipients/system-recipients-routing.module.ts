import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemRecipientFormComponent } from './system-recipient-create/system-recipient-create.component';
import { SystemRecipientUpdateComponent } from './system-recipient-update/system-recipient-update.component';
import { SystemRecipientsComponent } from './system-recipients.component';
import { SystemRecipientsViewComponent } from './system-recipients-view/system-recipients-view.component';
import { AuthGuardService } from 'src/app/shared/helpers/auth-guard.service';

const routes: Routes = [{ path: '', component: SystemRecipientsComponent, canActivateChild: [AuthGuardService], children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'system-recipients'
      },
      {
        path: 'system-recipients',
        component: SystemRecipientsViewComponent
      },
    ] },
    {path: 'system-recipient-update/:id', component: SystemRecipientUpdateComponent},
    {path: 'system-recipient-create', component: SystemRecipientFormComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRecipientsRoutingModule { }
