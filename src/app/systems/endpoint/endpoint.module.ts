import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTableModule } from '@angular/material/table';

import { EndpointRoutingModule } from './endpoint-routing.module';
import { EndpointComponent } from './endpoint.component';
import { EndpointFormComponent } from './endpoint-create/endpoint-create.component';
import { EndpointViewComponent } from './endpoint-view/endpoint-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EndpointUpdateComponent } from './endpoint-update/endpoint-update.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [EndpointComponent, EndpointViewComponent, EndpointFormComponent,EndpointUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EndpointRoutingModule,
    MDBBootstrapModule.forRoot(),
    SharedModule
  ],
  schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: []
})
export class EndpointModule { }
