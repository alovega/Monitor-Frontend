import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndpointComponent } from './endpoint.component';
import { EndpointViewComponent } from './endpoint-view/endpoint-view.component';
import { EndpointFormComponent } from './endpoint-form/endpoint-form.component';

const routes: Routes = [{ path: '', component: EndpointComponent, 
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
    ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndpointRoutingModule { }
