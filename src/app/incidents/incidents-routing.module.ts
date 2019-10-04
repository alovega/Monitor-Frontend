import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentsComponent } from './incidents.component';
import { OpenIncidentsComponent } from './open-incidents/open-incidents.component';
import { RealtimeIncidentsComponent } from './realtime-incidents/realtime-incidents.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';

const routes: Routes = [
  {
    path: '',
    component: IncidentsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'open'
      },
      {
        path: 'open',
        component: OpenIncidentsComponent
      },
      {
        path: 'realtime',
        component: RealtimeIncidentsComponent
      },
      {
        path: 'maintenance',
        component: MaintenanceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentsRoutingModule { }
