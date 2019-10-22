import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { EscalationRule } from '../escalation-rule';
import { EscalationRuleService } from '../escalation-rule.service';

@Component({
  selector: 'hm-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.scss']
})
export class CreateRuleComponent implements OnInit {
  escalationRuleForm: FormGroup;
  submitted = false;
  escalationRule: EscalationRule;
  ruleId: string;

  constructor(
    private formBuilder: FormBuilder,
    private ruleService: EscalationRuleService,
    private activatedRoute: ActivatedRoute,
    private location: Location) {

    this.escalationRule = new EscalationRule();
    this.ruleId = this.activatedRoute.snapshot.params['rule-id'];
   }
  ngOnInit() {
    this.createEscalationRuleForm();
  }

  createEscalationRuleForm() {
    this.escalationRuleForm = this.formBuilder.group({
      ruleName: ['', Validators.required],
      ruleDescription: ['', Validators.required],
      nEvents: ['', Validators.required],
      duration: ['', Validators.required],
      escalationLevel: ['High', Validators.required],
      eventType: ['Error', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.escalationRuleForm.invalid) {
      console.log('Invalid');
      return;
    }

    this.escalationRule.event_type = this.escalationRule.eventtype;
    this.escalationRule.escalation_level = this.escalationRule.escalation;
    this.escalationRule.status = 'Active';
    this.escalationRule.state = this.escalationRule.status;
    console.log(this.escalationRule);

    this.ruleService.createRule(this.escalationRule).subscribe(
      response => {
        if (response.code === '800.200.001') {
          console.log(this.escalationRule);
          this.location.back();
        }
      });
  }
}
