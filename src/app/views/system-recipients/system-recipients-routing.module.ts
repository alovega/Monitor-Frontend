import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemRecipientCreateComponent } from './system-recipient-create/system-recipient-create.component';
import { SystemRecipientUpdateComponent } from './system-recipient-update/system-recipient-update.component';
import { SystemRecipientsComponent } from './system-recipients.component';
import { AuthGuardService } from 'src/app/shared/helpers/auth-guard.service';

const routes: Routes = [
  { path: '', component: SystemRecipientsComponent, canActivateChild: [AuthGuardService]},
  {path: 'system-recipient-update/:id', component: SystemRecipientUpdateComponent, canActivateChild: [AuthGuardService]},
  {path: 'system-recipient-create', component: SystemRecipientCreateComponent, canActivateChild: [AuthGuardService]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRecipientsRoutingModule { }
