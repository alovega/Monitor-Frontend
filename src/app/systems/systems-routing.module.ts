import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemsComponent } from './systems.component';
import { AuthGuardService } from '../shared/helpers/auth-guard.service';
import { AddSystemComponent } from './add-system/add-system.component';

// const currentSystem = JSON.parse(localStorage.getItem('currentSystem'));
// const systemId = currentSystem.id.toString();
// console.log(systemId);

const routes: Routes = [
  { path: '', component: SystemsComponent, canActivate: [AuthGuardService]},
  // { path: ':system-id', component: SystemsComponent },
  { path: ':system-id/edit', component: AddSystemComponent },
  {path: 'system-recipients', loadChildren: () => import('./system-recipients/system-recipients.module').
  then(m => m.SystemRecipientsModule), canLoad: [AuthGuardService]},
  { path: 'endpoints', loadChildren: () => import('./endpoint/endpoint.module').then(m => m.EndpointModule),
  canLoad: [AuthGuardService] },
  { path: 'recipients', loadChildren: () => import('./recipient/recipient.module').then(m => m.RecipientModule),
  canLoad: [AuthGuardService] },
  { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule),
   canLoad: [AuthGuardService] },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
   canActivate: [AuthGuardService]},
  // { path: 'incidents', loadChildren: () => import('./incidents/incidents.module').then(m => m.IncidentsModule),
  // canLoad: [AuthGuardService]},s
  { path: 'rules', loadChildren: () => import('./escalation-rules/escalation-rules.module').then(m => m.EscalationRulesModule),
  canLoad: [AuthGuardService]},
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canLoad: [AuthGuardService] },
  { path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule), canLoad: [AuthGuardService]},
  { path: 'quick-setup', loadChildren: () => import('./setup-system/setup-system.module').then(m => m.SetupSystemModule) },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemsRoutingModule { }
