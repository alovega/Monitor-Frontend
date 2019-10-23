import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { DetailsComponent } from './details/details.component';
import { NotificationComponent } from './notification/notification.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [{ path: '', component: ProfileComponent,children:[
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'details'
  },
  {
    path:'details',
    component:DetailsComponent
  },
  {
    path:'notifications',
    component:NotificationComponent
  },
  {
    path:'edit',
    component:EditComponent
  }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
