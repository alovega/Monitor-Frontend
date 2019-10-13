import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemsRoutingModule } from './systems-routing.module';
import { SystemsComponent } from './systems.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SystemsComponent],
  imports: [
    CommonModule,
    SystemsRoutingModule,
    SharedModule
  ]
})
export class SystemsModule { }
