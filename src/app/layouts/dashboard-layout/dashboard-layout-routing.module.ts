import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardLayoutComponent } from './dashboard-layout.component';
import { DashboardComponent } from '../../views/dashboard/dashboard.component';
import { EditSystemComponent } from 'src/app/views/edit-system/edit-system.component';
import { AuthGuardService } from '../../shared/helpers/auth-guard.service';

const routes: Routes = [
  { path: '', component: DashboardLayoutComponent, canActivateChild: [AuthGuardService], children: [
    { path: 'metrics', component: DashboardComponent},
    { path: 'system/edit', component: EditSystemComponent, canActivate: [AuthGuardService]},
    { path: 'incidents', loadChildren: () => import(
      '../../views/incidents/incidents.module').then(m => m.IncidentsModule), canActivate: [AuthGuardService]},
    { path: 'endpoints', loadChildren: () => import(
      '../../views/endpoint/endpoint.module').then(m => m.EndpointModule), canActivate: [AuthGuardService]},
    { path: 'users', loadChildren: () => import(
      '../../views/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuardService]},
    { path: 'events', loadChildren: () => import(
      '../../views/events/events.module').then(m => m.EventsModule), canActivate: [AuthGuardService]},
    { path: 'recipients', loadChildren: () => import(
      '../../views/recipient/recipient.module').then(m => m.RecipientModule), canActivate: [AuthGuardService]},
    { path: 'system-recipients', loadChildren: () => import(
      '../../views/system-recipients/system-recipients.module').then(m => m.SystemRecipientsModule), canActivate: [AuthGuardService]},
    { path: 'notifications', loadChildren: () => import(
      '../../views/notifications/notifications.module').then(m => m.NotificationsModule), canActivate: [AuthGuardService]},
    {path: 'setup-user', loadChildren: () => import(
      '../../views/setup-user/setup-user.module').then(m => m.SetupUserModule), canActivate: [AuthGuardService]},
    { path: 'rules', loadChildren: () => import(
      '../../views/escalation-rules/escalation-rules.module').then(m => m.EscalationRulesModule), canActivate: [AuthGuardService]},
    { path: 'events', loadChildren: () => import(
      '../../views/events/events.module').then(m => m.EventsModule), canActivate: [AuthGuardService]},
    { path: 'quick-setup', loadChildren: () => import(
      '../../views/setup-system/setup-system.module').then(m => m.SetupSystemModule), canActivate: [AuthGuardService]},
    { path: 'profile', loadChildren: () => import(
      '../../profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuardService]},
    { path: '', pathMatch: 'full', redirectTo: 'metrics' },
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardLayoutRoutingModule { }
