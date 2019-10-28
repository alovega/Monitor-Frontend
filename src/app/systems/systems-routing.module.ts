import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemsComponent } from './systems.component';
import { AuthGuardService } from '../shared/helpers/auth-guard.service';

// const currentSystem = JSON.parse(localStorage.getItem('currentSystem'));
// const systemId = currentSystem.id.toString();
// console.log(systemId);

const routes: Routes = [
  { path: '', component: SystemsComponent, canActivate: [AuthGuardService]},
  {
    path: ':system-id', component: SystemsComponent
  },
  { path: ':system-id/endpoints', loadChildren: () => import('./endpoint/endpoint.module').then(m => m.EndpointModule) },
  { path: ':system-id/recipients', loadChildren: () => import('./recipients/recipients.module').then(m => m.RecipientsModule) },
  { path: ':system-id/notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule) },
  { path: ':system-id/dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: ':system-id/incidents', loadChildren: () => import('./incidents/incidents.module').then(m => m.IncidentsModule), canLoad: [AuthGuardService]},
  { path: ':system-id/rules', loadChildren: () => import('./escalation-rules/escalation-rules.module').then(m => m.EscalationRulesModule), canLoad: [AuthGuardService]},
  { path: ':system-id/users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canLoad: [AuthGuardService] },
  { path: ':system-id/endpoints', loadChildren: () => import('./endpoint/endpoint.module').then(m => m.EndpointModule) },
  { path: ':system-id/recipients', loadChildren: () => import('./recipients/recipients.module').then(m => m.RecipientsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemsRoutingModule { }
