import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscalationRulesComponent } from './escalation-rules.component';
import { CreateRuleComponent } from './create-rule/create-rule.component';
import { UpdateRuleComponent } from './update-rule/update-rule.component';

const routes: Routes = [
  { path: '',
    component: EscalationRulesComponent,
    children: [

    ]
  },
  {
    path: 'new',
    component: CreateRuleComponent
  },
  {
    path: 'edit/:rule-id',
    component: UpdateRuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscalationRulesRoutingModule { }
