import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';

import { SystemService } from '../../shared/system.service';
import { EscalationRuleService } from './escalation-rule.service';

@Component({
  selector: 'hm-escalation-rules',
  templateUrl: './escalation-rules.component.html',
  styleUrls: ['./escalation-rules.component.scss']
})
export class EscalationRulesComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTableSortDirective, { static: true }) mdbTableSort: MdbTableSortDirective;


  currentSystemId: string;
  currentSystem: any;
  rules: any[];
  previous: any = [];
  isLoaded = false;
  headElements = ['name', 'eventtype', 'description', 'nth_event', 'duration', 'escalation', 'date_created', 'action'];
  elements = {
    name: 'Name', eventtype: 'Event Type', description: 'Description', nth_event: 'Nth occurrence', duration: 'Duration',
    escalation: 'Escalation Level', date_created: 'Date Created', action: 'Action'
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private systemService: SystemService,
    private rulesService: EscalationRuleService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;
    this.rulesService.getRules().subscribe(
      (result => {
        this.rules = result;
        this.mdbTable.setDataSource(this.rules);
        this.rules = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
        console.log(result);
      })
    );
    this.isLoaded = true;
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
    console.log(this.mdbTablePagination.firstItemIndex);
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
        this.rulesService.deleteRule(ruleId).subscribe(
          response => {
            if (response.code === '800.200.001') {
              Swal.fire(
                'Deleted!',
                'This rule has been deleted.',
                'success'
              );
            } else {
              Swal.fire(
                'Failed!',
                'This rule could not be deleted.',
                'error'
              )}
          });
        this.rulesService.getRules().subscribe(
          result => {
            this.rules = result;
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
