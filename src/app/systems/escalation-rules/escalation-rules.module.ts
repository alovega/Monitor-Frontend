import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';

import { EscalationRulesRoutingModule } from './escalation-rules-routing.module';
import { EscalationRulesComponent } from './escalation-rules.component';
import { CreateRuleComponent } from './create-rule/create-rule.component';
import { UpdateRuleComponent } from './update-rule/update-rule.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [EscalationRulesComponent, CreateRuleComponent, UpdateRuleComponent],
  imports: [
    CommonModule,
    EscalationRulesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    SharedModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class EscalationRulesModule { }