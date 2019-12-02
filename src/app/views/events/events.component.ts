import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';
import { ModalDirective } from 'angular-bootstrap-md';

import { SystemService } from '../../shared/system.service';
import { Event, EventsResponse, EventResponse } from './event';
import { EventsService } from './events.service';
import { System } from 'src/app/shared/models/system';
import { ToastrService } from 'ngx-toastr';
import { DataSource } from '../../shared/data-table/model/dataSource';

@Component({
  selector: 'hm-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @ViewChild('eventInfo', {static: false}) eventInfo: ModalDirective;
  @ViewChild('buttonsTemplate', {static: true}) buttonsTemplate: TemplateRef<any>;
  @ViewChild('dateColumn', {static: true}) dateColumn: TemplateRef<any>;

  currentSystem: System;
  isLoaded = false;
  event: Event;
  dataSource = new DataSource();

  constructor(
    private toastr: ToastrService,
    private systemService: SystemService,
    private eventsService: EventsService) { }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.dataSource.columns = [
      {prop: 'item_index', name: 'Index'},
      {prop: 'event_type_name', name: 'Event Type', sortable: true}, {prop: 'description', name: 'Description', sortable: true},
      {prop: 'code', name: 'Code', sortable: true}, {prop: 'method', name: 'Method', sortable: false},
      { prop: 'date_created', cellTemplate: this.dateColumn, name: 'Date Created', sortable: true},
      {name: 'Action', cellTemplate: this.buttonsTemplate, sortable: false}];
    this.dataSource.url = 'events_data/';
    this.isLoaded = true;
  }

  public showEventInfo(eventId: string) {
    this.eventsService.getEvent<EventResponse>(eventId)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.event = response.body.data;
          this.eventInfo.show();
        } else {
          this.toastr.error('Information get failed', 'Get incident error');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }
}
