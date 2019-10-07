import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'hm-update-rule',
  templateUrl: './update-rule.component.html',
  styleUrls: ['./update-rule.component.scss']
})
export class UpdateRuleComponent implements OnInit {
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
