import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'hm-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.scss']
})
export class CreateRuleComponent implements OnInit {
  escalationRuleForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

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
    console.log(this.escalationRuleForm.value);
    let formData: any = new FormData();
    formData.append('name', this.escalationRuleForm.get('ruleName').value);
    formData.append('description', this.escalationRuleForm.get('ruleDescription').value);
    formData.append('nth_event', this.escalationRuleForm.get('nEvents').value);
    formData.append('duration', this.escalationRuleForm.get('duration').value);
    formData.append('escalation_level', this.escalationRuleForm.get('escalationLevel').value);
    formData.append('event_type', this.escalationRuleForm.get('eventType').value);

    for (let key of formData.entries()){
      console.log(key[0] + ', ' + key[1]);
    }
  }
}
