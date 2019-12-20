import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule, TableModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { EndpointRoutingModule } from './endpoint-routing.module';
import { EndpointComponent } from './endpoint.component';
import { EndpointFormComponent } from './endpoint-create/endpoint-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EndpointUpdateComponent } from './endpoint-update/endpoint-update.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [EndpointComponent, EndpointFormComponent, EndpointUpdateComponent],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    EndpointRoutingModule,
    MDBBootstrapModule.forRoot(),
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: []
})
export class EndpointModule { }
