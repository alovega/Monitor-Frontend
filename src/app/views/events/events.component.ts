import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';
import { ModalDirective } from 'angular-bootstrap-md';

import { SystemService } from '../../shared/system.service';
import { Event, EventsResponse, EventResponse } from './event';
import { EventsService } from './events.service';
import { System } from 'src/app/shared/models/system';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hm-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild('eventInfo', {static: false}) eventInfo: ModalDirective;
  @ViewChild('visibleItemsInput', { static: true }) visibleItemsInput;

  currentSystem: System;
  events: Event[];
  previous: any = [];
  isLoaded = false;
  search = '';
  event: Event;
  visibleItems = 5;
  headElements = [
    'eventtype', 'description', 'stack_trace', 'method', 'interface', 'request', 'response', 'code', 'date_created', 'action'];
  elements = {
    eventtype: 'Event type', description: 'Description', stack_trace: 'Stack Trace', interface: 'Interface', request: 'Request',
    response: 'Response', code: 'Code', date_created: 'Date Created', method: 'Method', action: 'Action'
  };

  constructor(
    private toastr: ToastrService,
    private systemService: SystemService,
    private eventsService: EventsService,
    private cdRef: ChangeDetectorRef) {
      this.events = [];
  }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();

    this.eventsService.getEvents<EventsResponse>()
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.events = response.body.data;
          this.mdbTable.setDataSource(this.events);
          this.events = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        } else {
          this.toastr.error('Could not retrieve events at the moment', 'Error');
        }
      } else {
        // TODO: Add error checks
      }
        // console.log('Current events => ' + result);
    });
    this.isLoaded = true;
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.visibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    if (this.events.length > this.visibleItems) {
      this.mdbTablePagination.nextShouldBeDisabled = false;
    }
    this.cdRef.detectChanges();
  }

  changeVisibleItems(maxNumber: number) {
    this.visibleItems = maxNumber;
    if (!maxNumber) {
      console.log(maxNumber);
      this.visibleItemsInput.nativeElement.value = 1;
      this.visibleItems = 1;
    }
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.visibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    if (this.events.length > this.visibleItems) {
      this.mdbTablePagination.nextShouldBeDisabled = false;
    }
    this.cdRef.detectChanges();
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

  public showEventInfo(eventId: string) {
    this.eventsService.getEvent<EventResponse>(eventId)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.event = response.body.data;
          this.eventInfo.show();
        } else {
          this.toastr.error('Incident information retrieval failed', 'Error');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }
}
