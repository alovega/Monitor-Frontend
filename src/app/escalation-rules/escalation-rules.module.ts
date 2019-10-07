import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { EscalationRulesRoutingModule } from './escalation-rules-routing.module';
import { EscalationRulesComponent } from './escalation-rules.component';
import { CreateRuleComponent } from './create-rule/create-rule.component';
import { UpdateRuleComponent } from './update-rule/update-rule.component';


@NgModule({
  declarations: [EscalationRulesComponent, CreateRuleComponent, UpdateRuleComponent],
  imports: [
    CommonModule,
    EscalationRulesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ]
})
export class EscalationRulesModule { }
