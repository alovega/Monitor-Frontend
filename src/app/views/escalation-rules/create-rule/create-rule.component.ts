import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { EscalationRule, EscalationRuleResponse } from '../../../shared/models/escalation-rule';
import { EscalationRuleService } from '../escalation-rule.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { DropdownItem } from 'src/app/layout/top-nav-bar/dropdown-item';
import { EscalationLevel } from 'src/app/shared/models/escalation-level';
import { EventType } from 'src/app/shared/models/event-type';

@Component({
  selector: 'hm-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.scss']
})
export class CreateRuleComponent implements OnInit {
  escalationRuleForm: FormGroup;
  submitted = false;
  escalationLevels: DropdownItem[];
  eventTypes: DropdownItem[];
  isdataReady = false;

  constructor(
    private formBuilder: FormBuilder,
    private ruleService: EscalationRuleService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private lookupService: LookUpService) { }
  ngOnInit() {
    const eventTypes = this.lookupService.getEventType();
    const escalationLevels = this.lookupService.getEscalationLevel();
    forkJoin([eventTypes, escalationLevels])
    .subscribe(results => {
      if (results[0]) {
        this.eventTypes = results[0].map((type: EventType) => ({id: type.id, text: type.name}));
      }
      if (results[1]) {
        this.escalationLevels = results[1].map((level: EscalationLevel) => ({id: level.id, text: level.name}));
      }
      this.createEscalationRuleForm();
      this.isdataReady = true;
    });
  }

  createEscalationRuleForm() {
    this.escalationRuleForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      nth_event: ['', [Validators.required, Validators.minLength(1)]],
      duration: ['', [Validators.required, Validators.minLength(1)]],
      escalation_level: ['', Validators.required],
      event_type: ['', Validators.required]
    });
  }

  public back(): void {
    this.location.back();
  }

  onSubmit() {
    this.submitted = true;
    if (this.escalationRuleForm.invalid) {
      console.log('Invalid');
      return;
    }
    // this.escalationRule.state = this.escalationRule.status;
    console.log(this.escalationRuleForm.value);
    this.ruleService.createRule<EscalationRuleResponse>(this.escalationRuleForm.value)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.toastr.success('Escalation rule was created successfully', 'Create Rule success');
          this.location.back();
        } else {
          this.toastr.error('Escalation rule could not be created', 'Create Rule error');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }
}
