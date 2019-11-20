import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  min: number = 5;
  constructor(
    private formBuilder: FormBuilder,
    private ruleService: EscalationRuleService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
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
      nEvents: ['', [Validators.required, Validators.minLength(1)]],
      duration: ['', [Validators.required, Validators.minLength(this.min)]],
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
    this.escalationRule.rule_id = this.ruleId;
    this.escalationRule.event_type = this.escalationRule.eventtype;
    this.ruleService.updateRule(this.escalationRule).subscribe(
      response => {
        console.log(response);
        if (response.code === '800.200.001') {
          this.toastr.success('Rule updated successfully', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Rule could not be updated', 'Error');
        }
      });
    // console.log(formData.getAll());
  }

  public back(): void {
    this.router.navigate(['dashboard/rules']);
  }

}
