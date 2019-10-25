import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './errors/pagenotfound/pagenotfound.component';
import { LoginComponent } from './shared/auth/login/login.component';
import { AuthGuardService } from './shared/helpers/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule) },
  { path: 'system', loadChildren: () => import('./systems/systems.module').then(m => m.SystemsModule)},
  { path: '', pathMatch: 'full', redirectTo: 'system', canActivate: [AuthGuardService]},
  { path: '**', component: PagenotfoundComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
