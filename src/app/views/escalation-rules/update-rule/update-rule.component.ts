import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { EscalationRuleService } from '../escalation-rule.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { EscalationRuleResponse, EscalationRule } from 'src/app/shared/models/escalation-rule';
import { EventType } from 'src/app/shared/models/event-type';
import { EscalationLevel } from 'src/app/shared/models/escalation-level';

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
  escalationLevels: any[];
  eventTypes: any[];
  escalationLevelId: string;
  eventTypeId: string;
  isdataReady = false;

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
      duration: ['', [Validators.required, Validators.minLength(5)]],
      escalation_level: ['', Validators.required],
      event_type: ['', Validators.required]
    });
    const eventTypes =  this.lookupService.getEventType();
    const escalationLevels = this.lookupService.getEscalationLevel();

    this.ruleService.getRule<EscalationRuleResponse>(this.ruleId)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.escalationRule = response.body.data;
          forkJoin([eventTypes, escalationLevels])
          .subscribe(results => {
            if (results[0]) {
              this.eventTypes = results[0].map((type: EventType) => ({id: type.id, text: type.name}));
              this.eventTypeId = this.eventTypes.filter(i => i.text === this.escalationRule.event_type_name)[0].id;
            }
            if (results[1]) {
              this.escalationLevels = results[1].map((level: EscalationLevel) => ({id: level.id, text: level.name}));
              this.escalationLevelId = this.escalationLevels.filter(i => i.text === this.escalationRule.escalation_level_name)[0].id;
            }
            this.populateEscalationRulesForm();
            this.isdataReady = true;
          });
        }
      } else {
        // TODO: Add error checks
      }
    });
  }

  get form() {
    return this.escalationRuleForm.controls;
  }

  populateEscalationRulesForm() {
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
    this.escalationRuleForm.markAsPristine();
    this.submitted = true;
    if (this.escalationRuleForm.invalid) {
      return;
    }

    this.ruleService.updateRule<EscalationRuleResponse>(this.escalationRule.id, this.escalationRuleForm.value)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.toastr.success('Rule updated successfully', 'Edit Rule success');
          this.location.back();
        } else {
          this.toastr.error('Rule could not be updated', 'Edit rule error');
        }
      } else {
        // TODO: Add error checks
      }
    });
    // console.log(formData.getAll());
  }

  public back(): void {
    this.router.navigate(['dashboard/rules']);
  }

}
