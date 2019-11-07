import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscalationRulesComponent } from './escalation-rules.component';
import { CreateRuleComponent } from './create-rule/create-rule.component';
import { UpdateRuleComponent } from './update-rule/update-rule.component';
import { AuthGuardService } from 'src/app/shared/helpers/auth-guard.service';

const routes: Routes = [
  { path: '',
    component: EscalationRulesComponent,
    canActivate: [AuthGuardService],
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
