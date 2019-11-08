import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { IncidentsRoutingModule } from './incidents-routing.module';
import { IncidentsComponent } from './incidents.component';
import { OpenIncidentsComponent } from './open-incidents/open-incidents.component';
import { RealtimeIncidentsComponent } from './realtime-incidents/realtime-incidents.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { CreateIncidentComponent } from './create-incident/create-incident.component';
import { SharedModule } from '../../shared/shared.module';
import { SearchIncidentsComponent } from './search-incidents/search-incidents.component';


@NgModule({
  declarations: [
    IncidentsComponent,
    OpenIncidentsComponent,
    RealtimeIncidentsComponent,
    MaintenanceComponent,
    CreateIncidentComponent,
    SearchIncidentsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IncidentsRoutingModule,
    MDBBootstrapModule,
    NgbModule,
    HttpClientModule,
    SharedModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class IncidentsModule { }
