import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';

import { SystemService } from '../../shared/system.service';
import { EventsService } from './events.service';

@Component({
  selector: 'hm-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  // @ViewChild(MdbTableSortDirective, { static: true }) mdbTableSort: MdbTableSortDirective;


  currentSystemId: string;
  currentSystem: any;
  events: any[];
  previous: any = [];
  isLoaded = false;
  search = '';

  headElements = ['eventtype', 'description', 'stack_trace', 'method', 'interface', 'request', 'response', 'code', 'date_created'];
  elements = {
    eventtype: 'Event type', description: 'Description', stack_trace: 'Stack Trace', interface: 'Interface', request: 'Request',
    response: 'Response', code: 'Code', date_created: 'Date Created', method: 'Method'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private systemService: SystemService,
    private eventsService: EventsService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;

    this.eventsService.getEvents().subscribe(
      (result => {
        this.events = result;
        this.mdbTable.setDataSource(this.events);
        this.events = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
        // console.log('Current events => ' + result);
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
      this.events = this.mdbTable.getDataSource();
    }

    if (search) {
      this.events = this.mdbTable.searchLocalDataBy(search);
      this.mdbTable.setDataSource(prev);
    }
  }

  onOpen(event: any) {
    console.log(event);
  }

  // removeRule(ruleId) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You will not be able to recover this rule!',
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete the rule!',
  //     cancelButtonText: 'No, keep the rule'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.eventsService.deleteRule(ruleId).subscribe(
  //         response => {
  //           if (response.code === '800.200.001') {
  //             Swal.fire(
  //               'Deleted!',
  //               'This rule has been deleted.',
  //               'success'
  //             )
  //           } else {
  //             Swal.fire(
  //               'Failed!',
  //               'This rule could not be deleted.',
  //               'error'
  //             )
  //           }
  //         }
  //       )
  //       this.rulesService.getRules().subscribe(
  //         result => {
  //           this.rules = result;
  //         }
  //       )
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire(
  //         'Cancelled',
  //         '',
  //         'error'
  //       )
  //     }
  //   })
  // }
}
