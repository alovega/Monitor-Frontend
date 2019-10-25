import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../user';
import { first } from 'rxjs/operators';
import { UsersService } from '../users.service';

@Component({
  selector: 'hm-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public addUserForm: FormGroup;
  user: User;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private usersService: UsersService
  ) {
    this.user = new User();
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: [''],
      lastname: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
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
    this.usersService.createUser(this.user).subscribe(
      response => {
        if (response.code === '800.200.001') {
          console.log(this.user);
          this.location.back();
        }
      });
  }

  public back(): void {
    this.location.back();
  }
}
