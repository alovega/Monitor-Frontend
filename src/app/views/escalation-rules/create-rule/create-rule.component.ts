import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { EscalationRule, EscalationRuleResponse } from '../../../shared/models/escalation-rule';
import { EscalationRuleService } from '../escalation-rule.service';
import { ToastrService } from 'ngx-toastr';
import { LookUpService } from 'src/app/shared/look-up.service';
import { DropdownItem } from 'src/app/layout/top-nav-bar/dropdown-item';

@Component({
  selector: 'hm-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.scss']
})
export class CreateRuleComponent implements OnInit {
  escalationRuleForm: FormGroup;
  submitted = false;
  escalationLevels: DropdownItem[];
  eventTypes: any;

  constructor(
    private formBuilder: FormBuilder,
    private ruleService: EscalationRuleService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private lookupService: LookUpService) { }
  ngOnInit() {
    this.lookupService.getEscalationLevel().subscribe(
      res => {
        this.escalationLevels = res.map((rule) => ({id: rule.id, text: rule.name}));
      }
    );
    this.lookupService.getEventType().subscribe(
      res => {
        this.eventTypes = res.map((type) => ({id: type.id, text: type.name}));
      }
    );
    this.createEscalationRuleForm();
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
    this.ruleService.createRule(this.escalationRuleForm.value).subscribe(
      response => {
        console.log(response);
        if (response.code === '800.200.001') {
          this.toastr.success('Escalation rule was created successfully', 'Create rule success');
          this.location.back();
        } else {
          this.toastr.error('Escalation rule could not be created', 'Create rule error');
        }
      });
  }
}
