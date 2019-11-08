import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './auth-layout.component';
import { LoginComponent } from 'src/app/views/login/login.component';

const routes: Routes = [
  { path: '', component: AuthLayoutComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: '', pathMatch: 'full', redirectTo: 'login'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }
