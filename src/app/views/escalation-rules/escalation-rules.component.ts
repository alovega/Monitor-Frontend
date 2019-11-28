import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

import { SystemService } from '../../shared/system.service';
import { EscalationRuleService } from './escalation-rule.service';
import { EscalationRule, EscalationRulesResponse, EscalationRuleResponse } from 'src/app/shared/models/escalation-rule';
import { System } from 'src/app/shared/models/system';
import { LookUpService } from 'src/app/shared/look-up.service';

@Component({
  selector: 'hm-escalation-rules',
  templateUrl: './escalation-rules.component.html',
  styleUrls: ['./escalation-rules.component.scss']
})
export class EscalationRulesComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTableSortDirective, { static: true }) mdbTableSort: MdbTableSortDirective;
  @ViewChild('visibleItemsInput', {static: false}) visibleItemsInput;

  currentSystemId: string;
  currentSystem: System;
  rules: EscalationRule[];
  previous: any = [];
  isLoaded = false;
  visibleItems: number = 5;
  headElements = ['name', 'eventtype', 'description', 'nth_event', 'duration', 'escalation', 'date_created', 'action'];
  elements = {
    name: 'Name', eventtype: 'Event Type', description: 'Description', nth_event: 'Nth occurrence', duration: 'Duration',
    escalation: 'Escalation Level', date_created: 'Date Created', action: 'Action'
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private systemService: SystemService,
    private rulesService: EscalationRuleService,
    private cdRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private lookupService: LookUpService) {
      this.rules = [];
    }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;
    this.rulesService.getRules<EscalationRulesResponse>()
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.rules = response.body.data;
          this.mdbTable.setDataSource(this.rules);
          this.rules = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        } else {
          this.toastr.error('Could not retrieve escalation rules', 'Get escalation rules error!');
        }
      } else {
        // TODO: Add error checks
      }
    });
    this.isLoaded = true;
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    if (this.rules.length > this.visibleItems) {
      this.mdbTablePagination.nextShouldBeDisabled = false;
    }
    this.cdRef.detectChanges();
  }

  getEventTypeName(eventTypeId: string) {
    this.lookupService.getEventType().subscribe(
      (res: any[]) => {
        console.log(res.filter(item => item.id === eventTypeId));
        return;
      }
    );
  }

  changeVisibleItems(maxNumber: number) {
    this.visibleItems = maxNumber;
    if (!maxNumber) {
      this.visibleItemsInput.nativeElement.value = 1;
      this.visibleItems = 1;
    }
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.visibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    if (this.rules.length > this.visibleItems) {
      this.mdbTablePagination.nextShouldBeDisabled = false;
    }
    this.cdRef.detectChanges();
  }

  searchItems(search: string) {
    const prev = this.mdbTable.getDataSource();

    if (!search) {
      this.mdbTable.setDataSource(this.previous);
      this.rules = this.mdbTable.getDataSource();
    }

    if (search) {
      this.rules = this.mdbTable.searchLocalDataBy(search);
      this.mdbTable.setDataSource(prev);
    }
  }

  onOpen(event: any) {
    console.log(event);
  }

  removeRule(ruleId) {
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
              this.toastr.success('Rule deleted successfully', 'Delete Rule Success');
            } else {
              this.toastr.error('Rule could not be deleted', 'Delete Rule Error');
            }
          } else {
            // TODO: Add error checks
          }
        });
        this.rulesService.getRules<EscalationRulesResponse>()
        .subscribe(response => {
          if (response.ok) {
            if (response.body.code === '800.200.001') {
              this.rules = response.body.data;
            } else {
              this.toastr.error('Could not retrieve escalation rules', 'Get escalation rules error!');
            }
          } else {
            // TODO: Add error checks
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          '',
          'error'
        )}
    });
  }
}
