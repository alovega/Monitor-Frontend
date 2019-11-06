import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { EscalationRule } from '../escalation-rule';
import { EscalationRuleService } from '../escalation-rule.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hm-update-rule',
  templateUrl: './update-rule.component.html',
  styleUrls: ['./update-rule.component.scss']
})
export class UpdateRuleComponent implements OnInit {
  escalationRuleForm: FormGroup;
  submitted = false;
  escalationRule: EscalationRule;
  ruleId: string;

  constructor(
    private formBuilder: FormBuilder,
    private ruleService: EscalationRuleService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService) {

    this.escalationRule = new EscalationRule();
    this.ruleId = this.activatedRoute.snapshot.params['rule-id'];
  }

  ngOnInit() {
    this.createEscalationRulesForm();
    this.ruleService.getRule(this.ruleId).subscribe(
      rule => this.escalationRule = rule
    );
  }

  get form() {
    return this.escalationRuleForm.controls;
  }

  createEscalationRulesForm() {
    this.escalationRuleForm = this.formBuilder.group({
      ruleName: ['', Validators.required],
      ruleDescription: ['', Validators.required],
      nEvents: ['', Validators.required],
      duration: ['', Validators.required],
      escalationLevel: ['High', Validators.required],
      eventType: ['Error']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.escalationRuleForm.invalid) {
      console.log('Invalid');
      return;
    }
    this.escalationRule.rule_id = this.ruleId;
    this.escalationRule.event_type = this.escalationRule.eventtype;
    this.ruleService.updateRule(this.escalationRule).subscribe(
      response => {
        if (response.code === '800.200.001') {
          this.toastr.success('Rule was successfully updated', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Rule could not be updated', 'Error');
        }
      });
    // console.log(formData.getAll());
  }

  public back(): void {
    this.location.back();
  }

}
