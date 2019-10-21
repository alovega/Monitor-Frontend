import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

import { SystemService } from '../../shared/system.service';
import { UsersService } from './users.service';

@Component({
  selector: 'hm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  currentSystemId: string;
  currentSystem: string;
  users: any[];
  previous: any = [];

  headElements = ['Username', 'Email', 'First Name', 'Last Name', 'Status', 'Date Created', 'Action'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private systemService: SystemService,
    private usersService: UsersService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.currentSystemId = param['system-id'];
        console.log(this.currentSystemId);
      });

    this.systemService.setSystem(this.currentSystemId).subscribe(
      (result => {
        this.currentSystem = result[0];
        // console.log(this.currentSystem);
      })
    );

    this.users = this.usersService.getUsers();
    this.mdbTable.setDataSource(this.users);
    this.users = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
    console.log(this.users);
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
    console.log(this.mdbTablePagination.firstItemIndex);
  }

  searchItems(search: string) {
    const prev = this.mdbTable.getDataSource();

    if (!search) {
      this.mdbTable.setDataSource(this.previous);
      this.users = this.mdbTable.getDataSource();
    }

    if (search) {
      this.users = this.mdbTable.searchLocalDataBy(search);
      this.mdbTable.setDataSource(prev);
    }
  }

}
