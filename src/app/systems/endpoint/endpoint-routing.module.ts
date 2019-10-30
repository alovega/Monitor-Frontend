import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndpointComponent } from './endpoint.component';
import { EndpointViewComponent } from './endpoint-view/endpoint-view.component';
import { EndpointFormComponent } from './endpoint-create/endpoint-create.component';
import { EndpointUpdateComponent } from './endpoint-update/endpoint-update.component';
import { AuthGuardService } from 'src/app/shared/helpers/auth-guard.service';

const routes: Routes = [{ path: '', component: EndpointComponent, canActivateChild: [AuthGuardService],
children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'endpoint'
      },
      {
        path: 'endpoint',
        component: EndpointViewComponent
      },
      {
        path: 'endpoint-form',
        component: EndpointFormComponent
      },
      {
        path: 'endpoint-update/:id',
        component: EndpointUpdateComponent
      },
    ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndpointRoutingModule { }
