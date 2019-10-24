import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentsComponent } from './incidents.component';
import { OpenIncidentsComponent } from './open-incidents/open-incidents.component';
import { RealtimeIncidentsComponent } from './realtime-incidents/realtime-incidents.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { UpdateIncidentComponent } from './update-incident/update-incident.component';
import { CreateIncidentComponent } from './create-incident/create-incident.component';
import { AuthGuardService } from 'src/app/shared/helpers/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: IncidentsComponent,
    canActivateChild: [AuthGuardService],
    children: [
      {
        path: 'open',
        component: OpenIncidentsComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'open'
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
  },
  { path: 'update/:incident-id', component: UpdateIncidentComponent },
  { path: 'new/:incident-type', component: CreateIncidentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentsRoutingModule { }
