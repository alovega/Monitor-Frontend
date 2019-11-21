import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndpointComponent } from './endpoint.component';
import { EndpointFormComponent } from './endpoint-create/endpoint-create.component';
import { EndpointUpdateComponent } from './endpoint-update/endpoint-update.component';
import { AuthGuardService } from 'src/app/shared/helpers/auth-guard.service';

const routes: Routes = [
  { path: '', component: EndpointComponent, canActivateChild: [AuthGuardService]},
  {path: 'endpoint-form', component: EndpointFormComponent, canActivateChild: [AuthGuardService]},
  {path: 'endpoint-update/:id', component: EndpointUpdateComponent, canActivateChild: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndpointRoutingModule { }
