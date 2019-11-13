import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';
import { ModalDirective } from 'angular-bootstrap-md';

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
  @ViewChild('eventInfo', {static: false}) eventInfo: ModalDirective;
  // @ViewChild(MdbTableSortDirective, { static: true }) mdbTableSort: MdbTableSortDirective;


  currentSystemId: string;
  currentSystem: any;
  events: any[];
  previous: any = [];
  isLoaded = false;
  search = '';
  event: any;
  headElements = [
    'eventtype', 'description', 'stack_trace', 'method', 'interface', 'request', 'response', 'code', 'date_created', 'action'];
  elements = {
    eventtype: 'Event type', description: 'Description', stack_trace: 'Stack Trace', interface: 'Interface', request: 'Request',
    response: 'Response', code: 'Code', date_created: 'Date Created', method: 'Method', action: 'Action'
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

  public showEventInfo(eventId: string) {
    this.eventsService.getEvent(eventId).subscribe(
      res => {
        this.event = res;
        this.eventInfo.show();
      }
    );
  }
}
