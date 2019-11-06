import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { EscalationRule } from '../../escalation-rules/escalation-rule';
import { EscalationRuleService } from '../../escalation-rules/escalation-rule.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { SetupService } from '../setup.service';

@Component({
  selector: 'hm-add-rules',
  templateUrl: './add-rules.component.html',
  styleUrls: ['./add-rules.component.scss']
})
export class AddRulesComponent implements OnInit {
  submitted = false;
  addRuleForm: FormGroup;
  editRuleForm: FormGroup;
  escalationRule: EscalationRule;
  escalationRules: EscalationRule[];
  ruleId: string;
  escalationLevels: any;
  @ViewChild('closeUpdateModal', { static: false }) closeUpdateModal: ElementRef;
  @ViewChild('closeAddModal', { static: false }) closeAddModal: ElementRef;
  @ViewChild('openBtn', { static: false }) openBtn: ElementRef;
  @ViewChild('openAddModal', { static: false }) openAddModal: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private ruleService: EscalationRuleService,
    private location: Location,
    private lookupService: LookUpService,
    private toastr: ToastrService,
    private setupService: SetupService) {
    this.escalationRule = new EscalationRule();
    // this.setupService.nextUrl.next(null);
    // this.setupService.previousUrl.next('endpoints');
   }
  ngOnInit() {
    this.setupService.nextUrl.next('/system/dashboard');
    this.setupService.previousUrl.next('endpoints');
    this.lookupService.getEscalationLevel().subscribe(
      (levels) => this.escalationLevels = levels
    );
    this.getRules();
    this.addRuleForm = this.formBuilder.group({
      ruleName: ['', Validators.required],
      ruleDescription: ['', Validators.required],
      nEvents: ['', Validators.required],
      duration: ['', Validators.required],
      escalationLevel: ['', Validators.required],
      eventType: ['', Validators.required]
    });

    this.editRuleForm = this.formBuilder.group({
      ruleName: ['', Validators.required],
      ruleDescription: ['', Validators.required],
      nEvents: ['', Validators.required],
      duration: ['', Validators.required],
      escalationLevel: ['', Validators.required],
      eventType: ['', Validators.required]
    });
  }

  getRules() {
    this.ruleService.getRules().subscribe(
      (rules) => this.escalationRules = rules
    );
  }

  addRule() {
    this.escalationRule = new EscalationRule();
    console.log(this.escalationRule);
    this.openAddModal.nativeElement.click();
  }

  editRule(ruleId: string) {
    this.ruleService.getRule(ruleId).subscribe(
      (rule) => {
        this.escalationRule = rule;
        console.log(this.escalationRule);
        this.openBtn.nativeElement.click();
      });
  }

  onSubmitAddRule() {
    this.submitted = true;
    if (this.addRuleForm.invalid) {
      console.log('Invalid');
      return;
    }

    this.escalationRule.state = 'Active';
    console.log(this.escalationRule);
    console.log(this.addRuleForm.controls.escalationLevel.value);
    this.ruleService.createRule(this.escalationRule).subscribe(
      response => {
        this.submitted = false;
        this.closeAddModal.nativeElement.click();
        if (response.code === '800.200.001') {
          this.getRules();
          this.toastr.success('Escalation rule created successfully!');
        } else {
          this.toastr.error('Escalation rule could not be created!', 'Error');
        }
      });
  }

  onSubmitEditRule() {
    this.submitted = true;
    if (this.editRuleForm.invalid) {
      console.log('Invalid');
      return;
    }
    this.escalationRule.event_type = this.escalationRule.eventtype;
    this.escalationRule.state = 'Active';
    this.ruleService.updateRule(this.escalationRule).subscribe(
      response => {
        this.submitted = false;
        this.closeUpdateModal.nativeElement.click();
        if (response.code === '800.200.001') {
          this.getRules();
          this.toastr.success('Escalation rule updated successfully!');
        } else {
          this.toastr.error('Escalation rule could not be updated!', 'Error');
        }
      });
  }
}
