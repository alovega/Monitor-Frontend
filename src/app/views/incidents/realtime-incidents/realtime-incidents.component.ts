import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy,
  ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ColumnMode} from '@swimlane/ngx-datatable';
import { SystemService } from '../../../shared/system.service';
import { ToastrService } from 'ngx-toastr';
import { System } from 'src/app/shared/models/system';
import { DataSource } from 'src/app/shared/data-table/model/dataSource';
import Swal from 'sweetalert2';

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
    this.loading = false;
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

  deleteIncident(incidentId: string) {
    Swal.fire({
      title: 'Confirm Incident deletion!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.incidentService.deleteIncident(incidentId).subscribe(
          response => {
            if (response.code === '800.200.001') {
              this.getTableData(this.page);
              this.toastr.success('Incident deleted successfully', 'Incident deletion success');
            } else {
              this.toastr.error('Incident could not be deleted', 'Incident delete error');
            }
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.info('Incident deletion aborted');
        // this.toastr.error('Incident could not be deleted', 'Incident delete error');
      }
    });
  }
}
