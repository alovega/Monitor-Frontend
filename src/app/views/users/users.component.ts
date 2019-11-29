import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';

import { SystemService } from '../../shared/system.service';
import { UsersService } from './users.service';
import { UsersResponse, User, UserResponse } from './user';
import { System } from 'src/app/shared/models/system';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild('visibleItemsInput', { static: true }) visibleItemsInput;

  currentSystem: System;
  users: User[];
  previous: any = [];
  isLoaded = false;
  visibleItems = 5;
  headElements = ['username', 'email', 'first_name', 'last_name', 'active', 'date_joined', 'action'];
  elements = {
    username: 'Username', email: 'Email', first_name: 'First Name', last_name: 'Last Name', active: 'Active',
    date_joined: 'Date Created', action: 'Action'
  };
  constructor(
    private systemService: SystemService,
    private usersService: UsersService,
    private cdRef: ChangeDetectorRef,
    private toastr: ToastrService) {
      this.users = [];
    }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.getUsers();
    this.cdRef.detectChanges();

  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.visibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    if (this.users.length > this.visibleItems) {
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
    if (this.users && (this.users.length > this.visibleItems)) {
      this.mdbTablePagination.nextShouldBeDisabled = false;
    }
    // this.cdRef.detectChanges();
  }

  getUsers() {
    this.usersService.getUsers<UsersResponse>()
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.users = response.body.data;
          this.mdbTable.setDataSource(this.users);
          this.users = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
          // console.log(this.users);
        } else {
          this.toastr.error('Failed to fetch users', 'Get users error');
        }
      } else {
        // TODO: Add error checks
      }
      this.isLoaded = true;
    });
  }

  searchItems(search: string) {
    const prev = this.mdbTable.getDataSource();
    if (!search) {
      this.mdbTable.setDataSource(this.previous);
      this.users = this.mdbTable.getDataSource();
    } else {
      this.users = this.mdbTable.searchLocalDataBy(search);
      this.mdbTable.setDataSource(prev);
    }
  }

  deleteUser(userId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete the user!',
      cancelButtonText: 'No, keep the user'
    }).then((result) => {
      if (result.value) {
        this.usersService.deleteUser<UserResponse>(userId)
        .subscribe(response => {
          if (response.ok) {
            if (response.body.code === '800.200.001') {
              Swal.fire('Deleted!', 'This user has been deleted.', 'success');
              this.getUsers();
            } else {
              Swal.fire('Failed!', 'This user could not be deleted.', 'error');
            }
          } else {
            // TODO: Add error checks
          }
        });
        // this.usersService.getUsers().subscribe(
        //   (response => {
        //     this.users = response.data;
        //   })
        // )

      } else if (result.dismiss) {
        Swal.fire('Cancelled', '', 'error');
      }
    });
  }
}
