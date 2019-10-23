import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './errors/pagenotfound/pagenotfound.component';
// import { IncidentsComponent } from './incidents/incidents.component';
// import { OpenIncidentsComponent } from './incidents/open-incidents/open-incidents.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'system'},
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  // { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  // { path: 'rules', loadChildren: () => import('./escalation-rules/escalation-rules.module').then(m => m.EscalationRulesModule) },
  // { path: 'incidents', loadChildren: () => import('./incidents/incidents.module').then(m => m.IncidentsModule) },
  { path: 'endpoint', loadChildren: () => import('./endpoint/endpoint.module').then(m => m.EndpointModule) },
  { path: 'recipients', loadChildren: () => import('./recipients/recipients.module').then(m => m.RecipientsModule) },
  { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule) },
  { path: 'system', loadChildren: () => import('./systems/systems.module').then(m => m.SystemsModule) },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
