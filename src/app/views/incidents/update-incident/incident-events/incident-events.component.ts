import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';
import { ModalDirective } from 'angular-bootstrap-md';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';

import { SystemService } from '../../../../shared/system.service';
// import { EventsService } from './events.service';

@Component({
  selector: 'hm-incident-events',
  templateUrl: './incident-events.component.html',
  styleUrls: ['./incident-events.component.scss']
})
export class IncidentEventsComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild('eventInfo', {static: false}) eventInfo: ModalDirective;
  @ViewChild('visibleItemsInput', {static: true}) visibleItemsInput;

  currentSystemId: string;
  currentSystem: any;
  events: any[];
  event: any;
  previous: any = [];
  incidentId: any;
  loading = true;
  visibleItems: number = 5;
  headElements = [
    'eventtype', 'description', 'stack_trace', 'method', 'interface', 'request', 'response', 'code', 'date_created', 'action'];
  elements = {
    eventtype: 'Event type', description: 'Description', stack_trace: 'Stack Trace', interface: 'Interface', request: 'Request',
    response: 'Response', code: 'Code', date_created: 'Date Created', method: 'Method', action: 'Action'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private systemService: SystemService,
    private cdRef: ChangeDetectorRef,
    private http: HttpClient
    ) {
      this.activatedRoute.parent.params.subscribe(params => {
        this.incidentId = params['incident-id'];
      });
    }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystem ? this.currentSystemId = this.currentSystem.id : this.currentSystemId = null;

    this.getEvents().subscribe(
      (result => {
        this.events = result;
        this.mdbTable.setDataSource(this.events);
        this.events = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
        console.log(result);
        this.loading = false;
      })
    );
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    if (this.events.length > this.visibleItems) {
      this.mdbTablePagination.nextShouldBeDisabled = false;
    }
    this.cdRef.detectChanges();
    console.log(this.mdbTablePagination.firstItemIndex);
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

  getEvents(): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'get_incident_events/', {
      incident_id: this.incidentId
    }).pipe(
      map(events => events.data.map(a => ({... a.incident_event}))
    ));
  }

  getEvent(eventId: string): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'get_event/', {
      event_id: eventId
    }).pipe(
      map(event => event.data));
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
    this.getEvent(eventId).subscribe(
      res => {
        this.event = res;
        this.eventInfo.show();
      }
    );
  }
}
