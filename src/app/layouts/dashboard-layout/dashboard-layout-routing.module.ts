import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardLayoutComponent } from './dashboard-layout.component';
import { DashboardComponent } from '../../views/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardLayoutComponent, children: [
    { path: 'metrics', component: DashboardComponent },
    { path: 'incidents', loadChildren: () => import('../../views/incidents/incidents.module').then(m => m.IncidentsModule)},
    { path: 'endpoints', loadChildren: () => import('../../views/endpoint/endpoint.module').then(m => m.EndpointModule)},
    { path: 'users', loadChildren: () => import('../../views/users/users.module').then(m => m.UsersModule)},
    { path: 'events', loadChildren: () => import('../../views/events/events.module').then(m => m.EventsModule)},
    { path: 'recipients', loadChildren: () => import('../../views/recipient/recipient.module').then(m => m.RecipientModule)},
    { path: 'system-recipients', loadChildren: () => import(
      '../../views/system-recipients/system-recipients.module').then(m => m.SystemRecipientsModule)},
    { path: 'notifications', loadChildren: () => import('../../views/notifications/notifications.module').then(m => m.NotificationsModule)},
    { path: 'rules', loadChildren: () => import('../../views/escalation-rules/escalation-rules.module').then(m => m.EscalationRulesModule)},
    { path: 'events', loadChildren: () => import('../../views/events/events.module').then(m => m.EventsModule)},
    { path: 'quick-setup', loadChildren: () => import('../../views/setup-system/setup-system.module').then(m => m.SetupSystemModule)},
    { path: '', pathMatch: 'full', redirectTo: 'metrics' },
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardLayoutRoutingModule { }
