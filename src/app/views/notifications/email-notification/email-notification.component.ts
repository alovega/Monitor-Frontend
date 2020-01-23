import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef, TemplateRef, ElementRef } from '@angular/core';
import { ColumnMode} from '@swimlane/ngx-datatable';
import { System } from 'src/app/shared/models/system';
import { BehaviorSubject} from 'rxjs';
import { Page} from '../../../shared/data-table/model/page';
import { DataSource } from '../../../shared/data-table/model/dataSource';

@Component({
  selector: 'hm-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.scss']
})
export class EmailNotificationComponent implements OnInit, AfterViewInit {
  @ViewChild('emailNotifications', { static: true }) openIncidents: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
  @ViewChild('visibleItemsInput', { static: true }) visibleItemsInput;
  @ViewChild('statusTemplate', {static: true}) statusTemplate: TemplateRef<any>;
  @ViewChild('dateColumn', {static: true}) dateColumn: TemplateRef<any>;

  currentSystem: System;
  dataSource = new DataSource();
  isLoading = true;
  message: string;
  load: boolean;
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
        name: 'Email Notifications'
      }
    ];
    this.dataSource.url = 'get_notification_data/';
    this.dataSource.extraKwargs = 'Email';
  }
  ngAfterViewInit() {}
}
