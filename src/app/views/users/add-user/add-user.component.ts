import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { User, UserResponse } from '../user';
import { UsersService } from '../users.service';
import { MustMatch } from '../../../shared/must-match.validator';

@Component({
  selector: 'hm-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public addUserForm: FormGroup;
  user: User;
  submitted = false;
  confirmPassword: any;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {
    this.user = new User();
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstname: [''],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addUserForm.invalid) {
      return;
    }
    console.log(this.addUserForm.value);
    // if (t)
    this.usersService.createUser<UserResponse>(this.addUserForm.value)
    .subscribe(response => {
      console.log(response);
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.toastr.success('User created successfully', 'User creation success');
          this.location.back();
        } else {
          this.toastr.error(response.body.message, 'User creation error');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }

  public back(): void {
    this.location.back();
  }
}
