import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { UpdateIncidentRoutingModule } from './update-incident-routing.module';
import { UpdateIncidentComponent } from './update-incident.component';
import { UpdateHistoryComponent } from './update-history/update-history.component';
import { IncidentEventsComponent } from './incident-events/incident-events.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelect2Module } from 'ng-select2';


@NgModule({
  declarations: [UpdateIncidentComponent, UpdateHistoryComponent, IncidentEventsComponent],
  imports: [
    CommonModule,
    UpdateIncidentRoutingModule,
    MDBBootstrapModule,
    NgbModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module
  ],
  schemas: [
    NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class UpdateIncidentModule { }
