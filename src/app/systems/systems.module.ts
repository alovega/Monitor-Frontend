import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemsRoutingModule } from './systems-routing.module';
import { SystemsComponent } from './systems.component';


@NgModule({
  declarations: [SystemsComponent],
  imports: [
    CommonModule,
    SystemsRoutingModule
  ]
})
export class SystemsModule { }
