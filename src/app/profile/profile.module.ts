import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule, TableModule} from 'angular-bootstrap-md';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { RecentNotificationComponent } from './recent-notification/recent-notification.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { UserNotificationsComponent } from './user-notifications/user-notifications.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';


@NgModule({
  declarations: [ProfileComponent, RecentNotificationComponent, EditComponent, DetailsComponent,
                UserNotificationsComponent, UpdatePasswordComponent],
  imports: [
    CommonModule,
    ShowHidePasswordModule,
    ProfileRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
  exports: [UpdatePasswordComponent]
})
export class ProfileModule { }
