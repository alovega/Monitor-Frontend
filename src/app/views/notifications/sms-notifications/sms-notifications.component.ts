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
  selector: 'hm-sms-notification',
  templateUrl: './sms-notifications.component.html',
  styleUrls: ['./sms-notifications.component.scss']
})
export class SmsNotificationsComponent implements OnInit, AfterViewInit {
  @ViewChild('smsNotifications', { static: true }) openIncidents: TemplateRef<any>;
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
        name: 'Sms Notifications'
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
      notification_type: 'Sms'
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

// import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
// import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
// import {NotificationsService} from '../notifications.service';
// import {Notification} from '../notification';
// import { ActivatedRoute } from '@angular/router';
// import { SystemService } from 'src/app/shared/system.service';

// @Component({
//   selector: 'hm-sms-notifications',
//   templateUrl: './sms-notifications.component.html',
//   styleUrls: ['./sms-notifications.component.scss']
// })
// export class SmsNotificationsComponent implements OnInit, AfterViewInit {
//   @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
//   @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
//   @ViewChild(MdbTableSortDirective, { static: true }) mdbTableSort: MdbTableSortDirective;
//   @ViewChild('visibleItemsInput', { static: true }) visibleItemsInput;
//   firstItemIndex: any;
//   lastItemIndex: any;
//   elements: any;
//   searchText = '';
//   currentSystem: any;
//   currentSystemId: any;
//   previous: any = [];
//   visibleItems: number = 5;
//   headElements: string[] = [ 'message', 'recipient', 'status', 'dateCreated'];
//   Elements = {
//     message: 'Message', recipient: 'Recipient', status: 'Status', dateCreated: 'Date Created'
//   };

//   constructor(
//     private notificationsService: NotificationsService,
//     private cdRef: ChangeDetectorRef,
//     private activatedRoute: ActivatedRoute,
//     private systemService: SystemService,
//     ) {}
//     @HostListener('input') oninput() {
//       this.searchItems();
//     }

//   ngOnInit() {
//     this.currentSystem = this.systemService.getCurrentSystem();
//     this.currentSystemId = this.currentSystem.id;
//     this.notificationsService.getSmsNotifications(this.currentSystemId)
//     .subscribe((data) => {
//       this.elements = data;
//       this.mdbTable.setDataSource(this.elements);
//       this.elements = this.mdbTable.getDataSource();
//       this.previous = this.mdbTable.getDataSource();
//     });
//   }
//   searchItems() {
//     const prev = this.mdbTable.getDataSource();

//     if (!this.searchText) {
//       this.mdbTable.setDataSource(this.previous);
//       this.elements = this.mdbTable.getDataSource();
//     }

//     if (this.searchText) {
//       this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
//       this.mdbTable.setDataSource(prev);
//     }
//   }
//   ngAfterViewInit() {
//     this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
//     this.mdbTablePagination.calculateFirstItemIndex();
//     this.mdbTablePagination.calculateLastItemIndex();
//     if (this.elements > this.visibleItems) {
//       this.mdbTablePagination.nextShouldBeDisabled = false;
//     }
//     this.cdRef.detectChanges();
//   }

//   changeVisibleItems(maxNumber: number) {
//     this.visibleItems = maxNumber;
//     if (!maxNumber) {
//       this.visibleItemsInput.nativeElement.value = 1;
//       this.visibleItems = 1;
//     }
//     this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.visibleItems);
//     this.mdbTablePagination.calculateFirstItemIndex();
//     this.mdbTablePagination.calculateLastItemIndex();
//     if (this.elements > this.visibleItems) {
//       this.mdbTablePagination.nextShouldBeDisabled = false;
//     }
//     this.cdRef.detectChanges();
//   }
// }
