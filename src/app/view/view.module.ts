import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EndpointFormComponent } from './endpoint/endpoint-form/endpoint-form.component';
import {ViewRoutingModule} from './view-routing.module';



@NgModule({
  declarations: [EndpointFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ViewRoutingModule
  ],
  exports: [EndpointFormComponent]
})
export class ViewModule { }
