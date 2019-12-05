import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';

import { SystemService } from '../../../../shared/system.service';
import { System } from 'src/app/shared/models/system';
import { DataSource } from 'src/app/shared/data-table/model/dataSource';
import { EventResponse, Event } from 'src/app/views/events/event';
import { EventsService } from 'src/app/views/events/events.service';

@Component({
  selector: 'hm-incident-events',
  templateUrl: './incident-events.component.html',
  styleUrls: ['./incident-events.component.scss']
})
export class IncidentEventsComponent implements OnInit {
  @ViewChild('eventInfo', {static: false}) eventInfo: ModalDirective;
  @ViewChild('buttonsTemplate', {static: true}) buttonsTemplate: TemplateRef<any>;
  @ViewChild('dateColumn', {static: true}) dateColumn: TemplateRef<any>;

  currentSystem: System;
  isLoaded = false;
  event: Event;
  dataSource = new DataSource();
  incidentId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private systemService: SystemService,
    private eventsService: EventsService,
    private toastr: ToastrService
    ) {
      this.activatedRoute.parent.params.subscribe(params => {
        this.incidentId = params['incident-id'];
      });
    }

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
          this.toastr.error('Get event information failed', 'Get event error');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }
}
