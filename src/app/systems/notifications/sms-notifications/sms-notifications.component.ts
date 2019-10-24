import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {NotificationsService} from '../notifications.service';
import {Notification} from '../notification';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sms-notifications',
  templateUrl: './sms-notifications.component.html',
  styleUrls: ['./sms-notifications.component.scss']
})
export class SmsNotificationsComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  firstItemIndex: any;
  lastItemIndex: any;
  elements: any;
  currentSystem: any;
  currentSystemId: any;
  previous: any = [];
  headElements: string[] = [ 'Notification','Recipient', 'Date Created', 'Status'];

  constructor(
    private notificationsService: NotificationsService, 
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
    ) {
    this.elements = []
   }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.currentSystemId = param['system-id'];
        console.log(this.currentSystemId);
      });
    this.elements = this.showNotifications()
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems(search: string) {
    const prev = this.mdbTable.getDataSource();

    if (!search) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (search) {
      this.elements = this.mdbTable.searchLocalDataBy(search);
      this.mdbTable.setDataSource(prev);
    }
  }
  showNotifications() {
    return this.notificationsService.getNotifications()
       .subscribe((data:Notification[]) => {
         console.log(data)
         this.elements = data.filter(data => data.notification_type === 'SMS')
       });
   }
}
