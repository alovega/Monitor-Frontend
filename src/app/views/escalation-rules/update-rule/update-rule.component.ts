import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { EscalationRuleService } from '../escalation-rule.service';
import { ToastrService } from 'ngx-toastr';
import { LookUpService } from 'src/app/shared/look-up.service';
import { EscalationRuleResponse, EscalationRule } from 'src/app/shared/models/escalation-rule';

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
  escalationLevels: any[];
  eventTypes: any[];
  escalationLevelId: string;
  eventTypeId: string;

  constructor(
    private formBuilder: FormBuilder,
    private ruleService: EscalationRuleService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private toastr: ToastrService,
    private lookupService: LookUpService) {

    this.ruleId = this.activatedRoute.snapshot.params['rule-id'];
  }

  ngOnInit() {
    this.escalationRuleForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      nth_event: ['', [Validators.required, Validators.minLength(1)]],
      duration: ['', [Validators.required, Validators.minLength(this.min)]],
      escalation_level: ['', Validators.required],
      event_type: ['', Validators.required]
    });

    this.ruleService.getRule(this.ruleId).subscribe(
      (res: EscalationRuleResponse) => {
        if (res.code === '800.200.001') {
          this.escalationRule = res.data;
          this.lookupService.getEventType().subscribe(
            res => {
              this.eventTypes = res.map(type => ({id: type.id, text: type.name}));
              this.eventTypeId = this.eventTypes.filter(i => i.text === this.escalationRule.event_type_name)[0].id;
            }
          );
          this.lookupService.getEscalationLevel().subscribe(
            res => {
              this.escalationLevels = res.map(level => ({id: level.id, text: level.name}));
              this.escalationLevelId = this.escalationLevels.filter(i => i.text === this.escalationRule.escalation_level_name)[0].id;
              this.createEscalationRulesForm();
            }
          );
        }
    });
  }

  get form() {
    return this.escalationRuleForm.controls;
  }

  createEscalationRulesForm() {
    this.escalationRuleForm.patchValue({
      name: this.escalationRule.name,
      description: this.escalationRule.description,
      nth_event: this.escalationRule.nth_event,
      duration: this.escalationRule.duration,
      escalation_level: this.escalationLevelId,
      event_type: this.eventTypeId,
    });
  }

  onSubmit() {
    console.log(this.escalationRuleForm);
    this.escalationRuleForm.markAsPristine();
    this.submitted = true;
    if (this.escalationRuleForm.invalid) {
      return;
    }

    this.ruleService.updateRule(this.escalationRule.id, this.escalationRuleForm.value).subscribe(
      (res: EscalationRuleResponse) => {
        if (res.code === '800.200.001') {
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
