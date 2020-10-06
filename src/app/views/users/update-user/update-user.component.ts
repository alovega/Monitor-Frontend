import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/views/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserResponse } from '../user';

@Component({
  selector: 'hm-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  public updateUserForm: FormGroup;
  public user: any;
  submitted = false;
  userId: string;
  loading: boolean = true;
  constructor(
    public location: Location,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    const phoneNumber = '^(\\+\\d{1,3}[- ]?)?\\d{10}$';
    this.updateUserForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      first_name: [''],
      last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.pattern(phoneNumber)]
    });
   }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('user-id');
    this.usersService.getUser<UserResponse>(this.userId)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.user = response.body.data;
          this.updateUserForm.patchValue({
            username: this.user.username,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            phone_number: this.user.phone_number,
            email: this.user.email
          });
          this.loading = false;
        } else {

        }
      } else {
        // TODO: Add error checks
      }
    });
  }

  public back(): void {
    this.location.back();
  }

  onSubmit() {
    this.submitted = true;
    if (this.updateUserForm.invalid) {
      return;
    }

    this.usersService.updateUser<UserResponse>(this.userId, this.updateUserForm.value)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.toastr.success('User updated successfully', 'User update success!');
          this.location.back();
        } else {
          this.toastr.error('User could not be updated', 'User update error!');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }
}
