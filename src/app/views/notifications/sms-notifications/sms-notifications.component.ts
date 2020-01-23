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


  constructor() {}
  ngOnInit() {
    this.dataSource.columns = [
      {
        cellTemplate: this.openIncidents,
        headerTemplate: this.hdrTpl,
        name: 'Sms Notifications'
      }
    ];
    this.dataSource.url = 'get_notification_data/';
    this.dataSource.extraKwargs = 'Sms';
  }
  ngAfterViewInit() {}
}