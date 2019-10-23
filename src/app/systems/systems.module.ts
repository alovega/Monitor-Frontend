import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { SystemsRoutingModule } from './systems-routing.module';
import { SystemsComponent } from './systems.component';
import { SharedModule } from '../shared/shared.module';
// import { NgbdModalContent, NgbdModalComponent } from './add-system/add-system.component';
import { AddSystemComponent } from './add-system/add-system.component';


@NgModule({
  declarations: [SystemsComponent, AddSystemComponent],
  imports: [
    CommonModule,
    SystemsRoutingModule,
    SharedModule,
    NgbModule,
    SweetAlert2Module.forRoot()
  ]
})
export class SystemsModule { }
