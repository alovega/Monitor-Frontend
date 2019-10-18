import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemsComponent } from './systems.component';

// const currentSystem = JSON.parse(localStorage.getItem('currentSystem'));
// const systemId = currentSystem.id.toString();
// console.log(systemId);

const routes: Routes = [
  { path: '', component: SystemsComponent,
  children: [
  ]},
  {
    path: ':system-id', component: SystemsComponent
  },
  { path: ':system-id/incidents', loadChildren: () => import('./incidents/incidents.module').then(m => m.IncidentsModule) },
  { path: ':system-id/rules', loadChildren: () => import('./escalation-rules/escalation-rules.module').then(m => m.EscalationRulesModule) },
  { path: ':system-id/users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: ':system-id/endpoints', loadChildren: () => import('./endpoint/endpoint.module').then(m => m.EndpointModule) },
  { path: ':system-id/recipients', loadChildren: () => import('./recipients/recipients.module').then(m => m.RecipientsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemsRoutingModule { }
