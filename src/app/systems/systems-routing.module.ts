import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemsComponent } from './systems.component';

const currentSystem = JSON.parse(localStorage.getItem('currentSystem'));
const systemId = currentSystem.id.toString();
console.log(systemId);

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: `${systemId}/incidents`
  },
  { path: 'system', component: SystemsComponent,
  children: [
  ]},
  {
    path: ':system-id', component: SystemsComponent
  },
  { path: ':system-id/incidents', loadChildren: () => import('./incidents/incidents.module').then(m => m.IncidentsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemsRoutingModule { }
