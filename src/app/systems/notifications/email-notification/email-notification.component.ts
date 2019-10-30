import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import {NotificationsService} from '../notifications.service';
import { Notification } from '../notification';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/shared/system.service';

@Component({
  selector: 'hm-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.scss']
})
export class EmailNotificationComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTableSortDirective, { static: true }) mdbTableSort: MdbTableSortDirective;
  firstItemIndex: any;
  lastItemIndex: any;
  searchText = '';
  elements: any;
  previous: any = [];
  currentSystem: any;
  currentSystemId: any;
  headElements: string[] = [ 'message', 'recipient', 'status', 'dateCreated'];

  constructor(
    private notificationsService: NotificationsService, private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private systemService: SystemService
    ) {}
    @HostListener('input') oninput() {
      this.searchItems();
    }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;
    this.notificationsService.getEmailNotifications(this.currentSystemId)
      .subscribe((data: Notification[]) => {
        this.elements = data;
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
    }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    console.log(prev);

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
