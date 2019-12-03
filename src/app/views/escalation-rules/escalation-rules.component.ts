import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import { SystemService } from '../../shared/system.service';
import { EscalationRuleService } from './escalation-rule.service';
import { EscalationRule, EscalationRulesResponse, EscalationRuleResponse } from 'src/app/shared/models/escalation-rule';
import { System } from 'src/app/shared/models/system';
import { DataSource } from 'src/app/shared/data-table/model/dataSource';

@Component({
  selector: 'hm-escalation-rules',
  templateUrl: './escalation-rules.component.html',
  styleUrls: ['./escalation-rules.component.scss']
})
export class EscalationRulesComponent implements OnInit {
  @ViewChild('buttonsTemplate', {static: true}) buttonsTemplate: TemplateRef<any>;
  @ViewChild('dateColumn', {static: true}) dateColumn: TemplateRef<any>;
  @ViewChild('durationColumn', {static: true}) durationColumn: TemplateRef<any>;

  currentSystem: System;
  rules: EscalationRule[];
  isLoading = true;
  dataSource = new DataSource();
  constructor(
    private systemService: SystemService,
    private rulesService: EscalationRuleService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef) {
      this.rules = [];
    }

  ngOnInit() {
    this.dataSource.columns = [
      {prop: 'item_index', name: 'Index'},
      {prop: 'name', name: 'Name', sortable: true}, {prop: 'description', name: 'Description', sortable: true},
      {prop: 'nth_event', name: 'Nth Event', sortable: true},
      {prop: 'escalation_level_name', name: 'Escalation Level'}, {prop: 'event_type_name', name: 'Event Type'},
      { prop: 'duration', cellTemplate: this.durationColumn, name: 'Duration', sortable: true},
      { prop: 'date_created', cellTemplate: this.dateColumn, name: 'Date Created', sortable: true},
      { name: 'Action', cellTemplate: this.buttonsTemplate, sortable: false}];
    this.dataSource.url = 'escalation_rules/';
    this.currentSystem = this.systemService.getCurrentSystem();
    this.isLoading = false;
  }

  removeRule(ruleId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this rule!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete the rule!',
      cancelButtonText: 'No, keep the rule'
    }).then((result) => {
      if (result.value) {
        this.rulesService.deleteRule<EscalationRuleResponse>(ruleId)
        .subscribe(response => {
          if (response.ok) {
            if (response.body.code === '800.200.001') {
              Swal.fire('Rule deleted successfully').then(
                (confirm) => {
                  if (confirm) {
                    window.location.reload();
                  }
              });
              this.dataSource = this.dataSource;
              this.cd.detectChanges();
            } else {
              this.toastr.error('Rule could not be deleted', 'Delete Rule Error');
            }
          } else {
            // TODO: Add error checks
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', '', 'error');
      }
    });
  }
}
