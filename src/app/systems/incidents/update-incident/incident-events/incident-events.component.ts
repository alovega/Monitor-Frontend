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
  currentSystem: string;
  events: any[];
  previous: any = [];
  incidentId: any;

  headElements = ['Event Type', 'Description', 'Method', 'Interface', 'Request', 'Response', 'Stack Trace', 'Code', 'Date Created'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private systemService: SystemService,
    private cdRef: ChangeDetectorRef,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.currentSystemId = param['system-id'];
        this.incidentId = param['incident-id'];
        console.log(this.incidentId);
      });

    this.systemService.setSystem(this.currentSystemId).subscribe(
      (result => {
        this.currentSystem = result[0];
        // console.log(this.currentSystem);
      })
    );

    this.getEvents().subscribe(
      (result => {
        this.events = result;
        this.mdbTable.setDataSource(this.events);
        this.events = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
        console.log('Current events => ' + result);
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
      tap(events => console.log(events)),
      map(events => events.data)
    );
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
