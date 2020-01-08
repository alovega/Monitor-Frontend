import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef, TemplateRef, ElementRef } from '@angular/core';
import { ColumnMode} from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { System } from 'src/app/shared/models/system';
import { BehaviorSubject, fromEvent, of } from 'rxjs';
import { Page, TableResponse } from '../../../shared/data-table/model/page';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import {NotificationsService} from '../notifications.service';
import { Notification } from '../notification';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../shared/system.service';
import { DataSource } from '../../../shared/data-table/model/dataSource';

@Component({
  selector: 'hm-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.scss']
})
export class EmailNotificationComponent implements OnInit, AfterViewInit {
  @ViewChild('emailNotifications', { static: true }) openIncidents: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
  @ViewChild('notificationsDataTable', { static: true }) table: any;
  @ViewChild('input', { static: true }) input: ElementRef;
  @ViewChild('visibleItemsInput', { static: true }) visibleItemsInput;
  @ViewChild('statusTemplate', {static: true}) statusTemplate: TemplateRef<any>;
  @ViewChild('dateColumn', {static: true}) dateColumn: TemplateRef<any>;

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
    private notificationsService: NotificationsService, private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private systemService: SystemService
    ) {
      this.page.offset = 0;
      this.page.size = 5;
      this.dataSource.url = 'get_notification_data/';
    }
  ngOnInit() {
    this.loading$.subscribe((response) => {
      this.load = response.valueOf();
      this.cd.detectChanges();
    });
    this.columns = [
      {
        cellTemplate: this.openIncidents,
        headerTemplate: this.hdrTpl,
        name: 'Email Notifications'
      }
    ];
    this.page.url = 'get_notification_data/';
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
    this.getTableData(this.page);
  }
  updateFilter() {
    this.page.searchQuery = this.input.nativeElement.value;
    this.getTableData(this.page);
  }
  getTableData<T>(page: Page) {
    this.loadingSubject.next(true);
    const options = {
      notification_type: 'Email'
    };
    this.notificationsService.getNotificationsTableData<TableResponse>(page, options)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.page.totalPages = response.body.data.totalPages;
          this.page.totalElements = response.body.data.totalElements;
          this.rows = response.body.data.row;
          this.message = response.body.data.range;
        } else {
          // TODO: Add error checks
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
