import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './errors/pagenotfound/pagenotfound.component';
import { LoginComponent } from './shared/auth/login/login.component';
import { AuthGuardService } from './shared/helpers/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', loadChildren: () => import('./layouts/dashboard-layout/dashboard-layout.module').then(m => m.DashboardLayoutModule), canActivate: [AuthGuardService]},
  { path: 'status', loadChildren: () => import('./layouts/public-layout/public-layout.module').then(m => m.PublicLayoutModule)},
  { path: 'auth', loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule) },
  // { path: '', pathMatch: 'full', redirectTo: 'system', canActivate: [AuthGuardService]},
  { path: '**', component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
