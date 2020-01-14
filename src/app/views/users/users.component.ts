import { Component, OnInit, ViewChild, ChangeDetectorRef, TemplateRef } from '@angular/core';
import Swal from 'sweetalert2';

import { SystemService } from '../../shared/system.service';
import { UsersService } from './users.service';
import { UserResponse } from './user';
import { System } from 'src/app/shared/models/system';
import { ToastrService } from 'ngx-toastr';
import { DataSource } from 'src/app/shared/data-table/model/dataSource';

@Component({
  selector: 'hm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('buttonsTemplate', {static: true}) buttonsTemplate: TemplateRef<any>;
  @ViewChild('dateColumn', {static: true}) dateColumn: TemplateRef<any>;
  @ViewChild('activeColumn', {static: true}) activeColumn: TemplateRef<any>;

  currentSystem: System;
  dataSource = new DataSource();
  isLoading = true;

  constructor(
    private systemService: SystemService,
    private usersService: UsersService) { }

  ngOnInit() {
    this.dataSource.columns = [
      {prop: 'item_index', name: 'Index'},
      {prop: 'username', name: 'Username', sortable: true}, {prop: 'first_name', name: 'First Name', sortable: true},
      {prop: 'last_name', name: 'Last Name', sortable: true}, {prop: 'email', name: 'Email', sortable: true},
      { prop: 'is_active', cellTemplate: this.activeColumn, name: 'Active', sortable: true},
      { prop: 'date_created', cellTemplate: this.dateColumn, name: 'Date Created', sortable: true},
      {name: 'Action', cellTemplate: this.buttonsTemplate, sortable: false}];
    this.dataSource.url = 'active_users/';
    this.currentSystem = this.systemService.getCurrentSystem();
    this.isLoading = false;
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
