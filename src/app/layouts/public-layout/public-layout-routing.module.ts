import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicLayoutComponent } from './public-layout.component';
import { LoginComponent } from 'src/app/views/login/login.component';
import { PublicDashboardComponent } from 'src/app/views/public-dashboard/public-dashboard.component';

const routes: Routes = [
  { path: '', component: PublicLayoutComponent, children: [
    { path: ':system-id', component: PublicDashboardComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicLayoutRoutingModule { }
