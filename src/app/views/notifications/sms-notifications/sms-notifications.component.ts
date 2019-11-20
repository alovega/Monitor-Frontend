import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import {NotificationsService} from '../notifications.service';
import {Notification} from '../notification';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/shared/system.service';

@Component({
  selector: 'hm-sms-notifications',
  templateUrl: './sms-notifications.component.html',
  styleUrls: ['./sms-notifications.component.scss']
})
export class SmsNotificationsComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTableSortDirective, { static: true }) mdbTableSort: MdbTableSortDirective;
  @ViewChild('visibleItemsInput', { static: true }) visibleItemsInput;
  firstItemIndex: any;
  lastItemIndex: any;
  elements: any;
  searchText = '';
  currentSystem: any;
  currentSystemId: any;
  previous: any = [];
  visibleItems: number = 5;
  headElements: string[] = [ 'message', 'recipient', 'status', 'dateCreated'];
  Elements = {
    message: 'Message', recipient: 'Recipient', status: 'Status', dateCreated: 'Date Created'
  };

  constructor(
    private notificationsService: NotificationsService,
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private systemService: SystemService,
    ) {}
    @HostListener('input') oninput() {
      this.searchItems();
    }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;
    this.notificationsService.getSmsNotifications(this.currentSystemId)
    .subscribe((data) => {
      this.elements = data;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
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
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    if (this.elements.length > this.visibleItems) {
      this.mdbTablePagination.nextShouldBeDisabled = false;
    }
    this.cdRef.detectChanges();
  }

  changeVisibleItems(maxNumber: number) {
    this.visibleItems = maxNumber;
    if (!maxNumber) {
      this.visibleItemsInput.nativeElement.value = 1;
      this.visibleItems = 1;
    }
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.visibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    if (this.elements.length > this.visibleItems) {
      this.mdbTablePagination.nextShouldBeDisabled = false;
    }
    this.cdRef.detectChanges();
  }
}
