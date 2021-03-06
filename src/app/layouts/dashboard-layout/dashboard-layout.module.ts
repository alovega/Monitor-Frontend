import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { NgSelect2Module } from 'ng-select2';

import { MaterialModule } from '../../material/material.module';
import { TopNavBarComponent } from '../../layout/top-nav-bar/top-nav-bar.component';
import { DashboardLayoutRoutingModule } from './dashboard-layout-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { SideNavComponent } from 'src/app/layout/navigation/side-nav/side-nav.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
// import { TopNavComponent } from 'src/app/layout/navigation/top-nav/top-nav.component';
import { IncidentsModule } from 'src/app/views/incidents/incidents.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from 'src/app/views/dashboard/dashboard.component';
import { EditSystemComponent } from 'src/app/views/edit-system/edit-system.component';
import { MenuListItemComponent } from '../../layout/menu-list-item/menu-list-item.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    TopNavBarComponent,
    // TopNavComponent,
    SideNavComponent,
    FooterComponent,
    DashboardComponent,
    EditSystemComponent,
    MenuListItemComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBBCMBffWFPoWuR8mMDe56nDKI4A9mf55k'
    }),
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    DashboardLayoutRoutingModule,
    SharedModule,
    IncidentsModule,
    NgSelect2Module
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardLayoutModule { }
