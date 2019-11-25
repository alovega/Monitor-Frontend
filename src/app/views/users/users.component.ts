import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';

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
  @ViewChild('visibleItemsInput', { static: true }) visibleItemsInput;

  currentSystemId: any;
  currentSystem: any;
  users: any[];
  previous: any = [];
  isLoaded = false;
  visibleItems = 5;
  headElements = ['username', 'email', 'first_name', 'last_name', 'active', 'date_joined', 'action'];
  elements = {
    username: 'Username', email: 'Email', first_name: 'First Name', last_name: 'Last Name', active: 'Active',
    date_joined: 'Date Created', action: 'Action'
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private systemService: SystemService,
    private usersService: UsersService,
    private cdRef: ChangeDetectorRef) {
      this.users = [];
    }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;

    this.usersService.getUsers().subscribe(
      result => {
        if (result.code === '800.200.001') {
          this.users = result.data;
          this.mdbTable.setDataSource(this.users);
          this.users = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
          // console.log(this.users);
        }
      }
    );
    this.isLoaded = true;
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
    if (this.users.length > this.visibleItems) {
      this.mdbTablePagination.nextShouldBeDisabled = false;
    }
    this.cdRef.detectChanges();
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

  deleteUser(userId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete the user!',
      cancelButtonText: 'No, keep the user'
    }).then((result) => {
      if (result.value) {
        this.usersService.deleteUser(userId).subscribe(
          response => {
            if (response.code === '800.200.001') {
              Swal.fire(
                'Deleted!',
                'This user has been deleted.',
                'success'
              );
              this.usersService.getUsers().subscribe(
                (users) => this.users = users.data
              )} else {
              Swal.fire(
                'Failed!',
                'This user could not be deleted.',
                'error'
              )}
          });
        this.usersService.getUsers().subscribe(
          (response => {
            this.users = response.data;
          })
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          '',
          'error'
        )
      }
    })
  }

}
