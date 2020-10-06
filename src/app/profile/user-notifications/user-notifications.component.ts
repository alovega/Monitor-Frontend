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
  @ViewChild('userNotifications', { static: true }) userNotifications: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
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

  constructor(private cd: ChangeDetectorRef, private profileService: ProfileService) {}

  ngOnInit() {
    this.dataSource.columns = [
      {
        cellTemplate: this.userNotifications,
        headerTemplate: this.hdrTpl,
        name: 'user Notifications'
      }
    ];
    this.dataSource.url = 'get_logged_in_user_notifications/';
  }
  ngAfterViewInit() {}
}
