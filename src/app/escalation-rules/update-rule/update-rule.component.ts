import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'hm-update-rule',
  templateUrl: './update-rule.component.html',
  styleUrls: ['./update-rule.component.scss']
})
export class UpdateRuleComponent implements OnInit {
  escalationRuleForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createEscalationRulesForm();
  }

  createEscalationRulesForm() {
    this.escalationRuleForm = this.formBuilder.group({
      ruleName: ['', Validators.required],
      ruleDescription: ['', Validators.required],
      nEvents: ['', Validators.required],
      duration: ['', Validators.required],
      esalationLevel: ['', Validators.required],
      eventType: ['Error', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.escalationRuleForm.value);
  }

}
