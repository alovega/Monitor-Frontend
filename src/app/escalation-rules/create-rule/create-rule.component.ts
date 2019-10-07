import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'hm-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.scss']
})
export class CreateRuleComponent implements OnInit {
  escalationRuleForm = new FormGroup ({
    ruleName: new FormControl(''),
    ruleDescription: new FormControl(''),
    nEvents: new FormControl(''),
    duration: new FormControl(''),
    esalationLevel: new FormControl(''),
    eventType: new FormControl('Error')
  });
  constructor() { }

  ngOnInit() {
  }

}
