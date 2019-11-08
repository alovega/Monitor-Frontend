import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipientRoutingModule } from './recipient-routing.module';
import { RecipientComponent } from './recipient.component';
import { RecipientViewComponent } from './recipient-view/recipient-view.component';
import { RecipientCreateComponent } from './recipient-create/recipient-create.component';
import { RecipientUpdateComponent } from './recipient-update/recipient-update.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MDBBootstrapModule, TableModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RecipientComponent, RecipientViewComponent, RecipientCreateComponent, RecipientUpdateComponent],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    RecipientRoutingModule,
    MDBBootstrapModule.forRoot(),
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: []
})
export class RecipientModule { }
