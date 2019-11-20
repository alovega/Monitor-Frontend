import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'hm-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss']
})
export class UserNotificationsComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTableSortDirective, { static: true }) mdbTableSort: MdbTableSortDirective;
  firstItemIndex: any;
  lastItemIndex: any;
  searchText = '';
  elements: any;
  previous: any = [];
  headElements = ['message', 'type', 'status', 'dateCreated'];
  Elements = {
    message: 'Message', type: 'Type', status: 'Status', dateCreated: 'Date Created'
  };

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
