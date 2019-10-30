import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { DetailsComponent } from './details/details.component';
import { RecentNotificationComponent } from './recent-notification/recent-notification.component';
import { EditComponent } from './edit/edit.component';
import { UserNotificationsComponent } from './user-notifications/user-notifications.component';
import { AuthGuardService } from '../shared/helpers/auth-guard.service';

const routes: Routes = [{ path: '', component: ProfileComponent, canActivateChild: [AuthGuardService],
  children: [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'details'
      },
      {
        path: 'details',
        component: DetailsComponent
      },
      {
        path: 'recent-notifications',
        component: RecentNotificationComponent
      },
      {
        path: 'edit',
        component: EditComponent
      }
    ]
  },
  { path: 'user-notifications', component: UserNotificationsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
