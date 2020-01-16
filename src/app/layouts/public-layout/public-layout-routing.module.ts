import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicLayoutComponent } from './public-layout.component';
import { LoginComponent } from 'src/app/views/login/login.component';
import { StatusPageComponent } from 'src/app/views/public-dashboard/status-page.component';

const routes: Routes = [
  { path: '', component: PublicLayoutComponent, children: [
    { path: ':system-id', loadChildren: () => import('src/app/views/public-dashboard/status-page.module').then(m => m.StatusPageModule) }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicLayoutRoutingModule { }
