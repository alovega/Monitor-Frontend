import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipientComponent } from './recipient.component';
import { RecipientUpdateComponent } from './recipient-update/recipient-update.component';
import { RecipientCreateComponent } from './recipient-create/recipient-create.component';
import { AuthGuardService } from 'src/app/shared/helpers/auth-guard.service';

const routes: Routes = [
  { path: '', component: RecipientComponent, canActivateChild: [AuthGuardService]},
  {path: 'recipient-update/:id', component: RecipientUpdateComponent},
  {path: 'recipient-create', component: RecipientCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipientRoutingModule { }
