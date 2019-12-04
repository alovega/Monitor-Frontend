import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy,
  ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ColumnMode} from '@swimlane/ngx-datatable';
import { SystemService } from '../../../shared/system.service';
import { ToastrService } from 'ngx-toastr';
import { System } from 'src/app/shared/models/system';
import { DataSource } from 'src/app/shared/data-table/model/dataSource';

import { BehaviorSubject, fromEvent, of } from 'rxjs';
import { Page, TableResponse } from '../../../shared/data-table/model/page';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { IncidentService } from '../incident.service';


@Component({
  selector: 'hm-realtime-incidents',
  templateUrl: './realtime-incidents.component.html',
  styleUrls: ['./realtime-incidents.component.scss']
})
export class RealtimeIncidentsComponent implements OnInit, AfterViewInit {
  @ViewChild('realtimeIncidents', { static: true }) realtimeIncidents: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
  @ViewChild('incidentsDataTable', { static: true }) table: any;
  @ViewChild('input', { static: true }) input: ElementRef;

  currentSystem: System;
  dataSource = new DataSource();
  isLoading = true;
  rows: any[];
  message: string;
  load: boolean;
  columns: any[];
  pagination = [5, 10, 25, 50, 100];
  page: any = new Page();
  paginator: any;
  ColumnMode = ColumnMode;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private systemService: SystemService,
    private toastr: ToastrService,
    private incidentService: IncidentService,
    private cd: ChangeDetectorRef
  ) {
    this.page.offset = 0;
    this.page.size = 5;
    this.dataSource.url = 'incidents/';
  }

  ngOnInit() {
    this.loading$.subscribe((response) => {
      this.load = response.valueOf();
      this.cd.detectChanges();
      console.log(response.valueOf());
    });
    this.columns = [
      {
        cellTemplate: this.realtimeIncidents,
        headerTemplate: this.hdrTpl,
        name: 'Open Incidents'
      }
    ];
    this.page.url = 'incidents/';
    this.pageCallback({ offset: 0 });
    this.currentSystem = this.systemService.getCurrentSystem();
    this.cd.detectChanges();
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.updateFilter();
      })
      ).subscribe();
  }
  pageCallback(pageInfo: { count?: number, pageSize?: number, size?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.getTableData(this.page);
  }

  sortCallback(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
    // there will always be one "sort" object if "sortType" is set to "single"
    this.page.orderDir = sortInfo.sorts[0].dir;
    this.page.orderBy = sortInfo.sorts[0].prop;
    console.log(this.table.offset);
    this.getTableData(this.page);
  }
  updateFilter() {
    this.page.searchQuery = this.input.nativeElement.value;
    this.getTableData(this.page);
  }
  getTableData<T>(page: Page) {
    this.loadingSubject.next(true);
    const options = {
      incident_type: 'Realtime'
    };
    this.incidentService.getIncidentsTableData<TableResponse>(page, options)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.page.totalPages = response.body.data.totalPages;
          this.page.totalElements = response.body.data.totalElements;
          this.rows = response.body.data.row;
          this.message = response.body.data.range;
        } else {

        }
      }
      this.loadingSubject.next(false);
      this.cd.detectChanges();
    });
  }
  changePagination(event) {
    this.page.size = event.target.value;
    this.getTableData(this.page);
  }
}
