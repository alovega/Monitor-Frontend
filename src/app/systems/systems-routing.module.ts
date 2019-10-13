import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemsComponent } from './systems.component';

const currentSystem = JSON.parse(localStorage.getItem('currentSystem'));
console.log(currentSystem.id.toString());
const systemId = currentSystem.id.toString();

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: `${systemId}/incidents`
  },
  { path: 'system', component: SystemsComponent,
  children: [
  ]},
  {
    path: ':system-id', pathMatch: 'prefix', redirectTo: `${systemId}/incidents`
  },
  { path: ':system-id/incidents', loadChildren: () => import('./incidents/incidents.module').then(m => m.IncidentsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemsRoutingModule { }
