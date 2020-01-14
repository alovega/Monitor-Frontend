import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { EscalationRuleService } from '../../escalation-rules/escalation-rule.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { SetupService } from '../setup.service';
import { EscalationRule, EscalationRulesResponse, EscalationRuleResponse } from 'src/app/shared/models/escalation-rule';

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
  escalationLevels: any[];
  eventTypes: any[];
  loading = true;
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
    // this.setupService.nextUrl.next(null);
    // this.setupService.previousUrl.next('endpoints');
    this.addRuleForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      nth_event: ['', [Validators.required, Validators.minLength(1)]],
      duration: ['', [Validators.required, Validators.minLength(1)]],
      escalation_level: ['', Validators.required],
      event_type: ['', Validators.required]
    });

    this.editRuleForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      nth_event: ['', [Validators.required, Validators.minLength(1)]],
      duration: ['', [Validators.required, Validators.minLength(1)]],
      escalation_level: ['', Validators.required],
      event_type: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.setupService.nextUrl.next('/dashboard');
    this.setupService.previousUrl.next('endpoints');
    this.lookupService.getEscalationLevel().subscribe(
      (levels) => this.escalationLevels = levels
    );
    this.lookupService.getEventType().subscribe(
      (res) => this.eventTypes = res
    );
    this.getRules();
    this.loading = false;
  }

  getRules() {
    this.ruleService.getRules<EscalationRulesResponse>()
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.escalationRules = response.body.data;
          if (!this.escalationRules.length) {
            this.setupService.disabledNext.next(true);
          }
        }
      } else {
        // TODO: Add error checks
      }
    });
  }

  addRule() {
    this.escalationRule = new EscalationRule();
    this.openAddModal.nativeElement.click();
  }

  editRule(ruleId: string) {
    this.ruleService.getRule<EscalationRuleResponse>(ruleId).
    subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.escalationRule = response.body.data;
          this.editRuleForm.patchValue({
            name: this.escalationRule.name,
            description: this.escalationRule.description,
            nth_event: this.escalationRule.nth_event,
            duration: this.escalationRule.duration,
            escalation_level: this.escalationLevels.filter(item => item.name === this.escalationRule.escalation_level_name)[0].id,
            event_type: this.eventTypes.filter(item => item.name === this.escalationRule.event_type_name)[0].id,
          });
          this.openBtn.nativeElement.click();
        } else {
          this.toastr.error('Escalation rule could not be retrieved', 'Edit escalation rule error');
        }
      } else {
        // TODO: Add error checks
      }

    });
  }

  onSubmitAddRule() {
    this.submitted = true;
    if (this.addRuleForm.invalid) {
      return;
    }

    this.ruleService.createRule<EscalationRuleResponse>(this.addRuleForm.value)
    .subscribe(response => {
      if (response.ok) {
        this.submitted = false;
        if (response.body.code === '800.200.001') {
          this.getRules();
          this.toastr.success('Escalation rule created successfully!');
          this.closeAddModal.nativeElement.click();
        } else {
          this.toastr.error('Escalation rule creation failed! Try again later', 'Escalation rule creation error');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }

  onSubmitEditRule() {
    this.submitted = true;
    if (this.editRuleForm.invalid) {
      return;
    }
    this.ruleService.updateRule<EscalationRuleResponse>(this.escalationRule.id, this.editRuleForm.value)
    .subscribe(response => {
      if (response.ok) {
        this.submitted = false;
        if (response.body.code === '800.200.001') {
          this.getRules();
          this.toastr.success('Escalation rule updated successfully!');
          this.closeUpdateModal.nativeElement.click();
        } else {
          this.toastr.error('Escalation rule edit failed! Try again later', 'Edit Escalation rule error');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }
}
