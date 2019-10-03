import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [PagenotfoundComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    PagenotfoundComponent, RouterModule
  ]
})
export class ErrorsModule { }
