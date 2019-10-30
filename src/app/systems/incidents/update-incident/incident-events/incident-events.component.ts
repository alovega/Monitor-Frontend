import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';
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

  currentSystemId: string;
  currentSystem: any;
  events: any[];
  previous: any = [];
  incidentId: any;
  headElements = ['eventtype', 'description', 'stack_trace', 'method', 'interface', 'request', 'response', 'code', 'date_created'];
  elements = {
    eventtype: 'Event type', description: 'Description', stack_trace: 'Stack Trace', interface: 'Interface', request: 'Request',
    response: 'Response', code: 'Code', date_created: 'Date Created', method: 'Method'
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
        // console.log(result);
      })
    );
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
    console.log(this.mdbTablePagination.firstItemIndex);
  }

  getEvents(): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'get_incident_events/', {
      incident_id: this.incidentId
    }).pipe(
      map(events => events.data.map(a => ({... a.incident_event}))
    ));
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
}
