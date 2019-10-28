import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AuthGuardService } from 'src/app/shared/helpers/auth-guard.service';

const routes: Routes = [
  { path: '', component: UsersComponent, canActivate: [AuthGuardService] },
  { path: 'new', component: AddUserComponent},
  { path: 'update', component: UpdateUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
