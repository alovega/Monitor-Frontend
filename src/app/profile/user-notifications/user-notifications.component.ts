import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, HostListener, TemplateRef, ElementRef } from '@angular/core';
import { ProfileService } from '../profile.service';
import { BehaviorSubject, fromEvent} from 'rxjs';
import { ColumnMode} from '@swimlane/ngx-datatable';
import { Page, TableResponse } from '../../shared/data-table/model/page';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { DataSource } from '../../shared/data-table/model/dataSource';

@Component({
  selector: 'hm-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss']
})
export class UserNotificationsComponent implements OnInit, AfterViewInit {
  @ViewChild('userlNotifications', { static: true }) userNotifications: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
  @ViewChild('notificationsDataTable', { static: true }) table: any;
  @ViewChild('input', { static: true }) input: ElementRef;
  @ViewChild('visibleItemsInput', { static: true }) visibleItemsInput;
  @ViewChild('statusTemplate', {static: true}) statusTemplate: TemplateRef<any>;
  @ViewChild('dateColumn', {static: true}) dateColumn: TemplateRef<any>;
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

  constructor(private cdRef: ChangeDetectorRef, private profileService: ProfileService) { }
  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {
    this.profileService.getLoggedInuserNotifications().subscribe(
      response => {
        this.elements = response;
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }
}
