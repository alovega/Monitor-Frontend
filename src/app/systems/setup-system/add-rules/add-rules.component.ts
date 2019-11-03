import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { EscalationRule } from '../../escalation-rules/escalation-rule';
import { EscalationRuleService } from '../../escalation-rules/escalation-rule.service';
import { LookUpService } from 'src/app/shared/look-up.service';

@Component({
  selector: 'hm-add-rules',
  templateUrl: './add-rules.component.html',
  styleUrls: ['./add-rules.component.scss']
})
export class AddRulesComponent implements OnInit {
  submitted = false;
  addRuleForm: FormGroup;
  escalationRule: EscalationRule;
  ruleId: string;
  escalationLevels: any;
  @ViewChild('closeUpdateModal', { static: false }) closeUpdateModal: ElementRef;
  @ViewChild('closeAddModal', { static: false }) closeAddModal: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private ruleService: EscalationRuleService,
    private location: Location,
    private lookupService: LookUpService) {
    this.escalationRule = new EscalationRule();
   }
  ngOnInit() {
    this.lookupService.getEscalationLevel().subscribe(
      (levels) => this.escalationLevels = levels
    );
    this.addRuleForm = this.formBuilder.group({
      ruleName: ['', Validators.required],
      ruleDescription: ['', Validators.required],
      nEvents: ['', Validators.required],
      duration: ['', Validators.required],
      escalationLevel: ['High', Validators.required],
      eventType: ['Error', Validators.required]
    });
  }

  public back(): void {
    this.location.back();
  }

  onSubmitAddRule() {
    this.submitted = true;
    if (this.addRuleForm.invalid) {
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
