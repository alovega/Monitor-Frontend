import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr'

import { User } from '../user';
import { first } from 'rxjs/operators';
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
    private router: Router,
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
      console.log('Invalid');
      return;
    }

    // this.user.event_type = this.escalationRule.eventtype;
    // this.escalationRule.escalation_level = this.escalationRule.escalation;
    // this.user.status = 'Active';
    // this.user.state = this.escalationRule.status;
    console.log(this.user);
    // if (t)
    this.usersService.createUser(this.user).subscribe(
      response => {
        if (response.code === '800.200.001') {
          this.toastr.success('User created successfully', 'User creation success');
          this.location.back();
        } else {
          this.toastr.error(response.message, 'User creation error');
        }
      });
  }

  public back(): void {
    this.location.back();
  }
}
