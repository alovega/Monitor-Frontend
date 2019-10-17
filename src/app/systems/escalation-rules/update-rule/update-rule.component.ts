import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'hm-update-rule',
  templateUrl: './update-rule.component.html',
  styleUrls: ['./update-rule.component.scss']
})
export class UpdateRuleComponent implements OnInit {
  escalationRuleForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createEscalationRulesForm();
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
      eventType: ['Error', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    // console.log(this.escalationRuleForm.value);
    if (this.escalationRuleForm.invalid) {
      console.log('Invalid');
      return;
    }

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
    // console.log(formData.getAll());
  }

}
