import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

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

  currentSystemId: string;
  currentSystem: string;
  rules: any[];
  previous: any = [];

  headElements = ['Name', 'Description', 'Nth occurrence', 'Duration', 'Escalation Level', 'Date Created', 'Action'];


  constructor(
    private activatedRoute: ActivatedRoute,
    private systemService: SystemService,
    private rulesService: EscalationRuleService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.currentSystemId = param['system-id'];
        console.log(this.currentSystemId);
      });

    this.systemService.setSystem(this.currentSystemId).subscribe(
      (result => {
        this.currentSystem = result[0];
        // console.log(this.currentSystem);
      })
    );

    this.rules = this.rulesService.getRules();
    this.mdbTable.setDataSource(this.rules);
    this.rules = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
    console.log(this.rules);
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
}
