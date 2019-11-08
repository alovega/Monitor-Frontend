import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupSystemComponent } from './setup-system.component';
import { AddEndpointsComponent } from './add-endpoints/add-endpoints.component';
import { AddRulesComponent } from './add-rules/add-rules.component';

const routes: Routes = [
  { path: '', component: SetupSystemComponent , children:[
    { path: 'endpoints', component: AddEndpointsComponent},
    { path: 'rules', component: AddRulesComponent},
    { path: '', pathMatch: 'full', redirectTo: 'endpoints'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupSystemRoutingModule { }
