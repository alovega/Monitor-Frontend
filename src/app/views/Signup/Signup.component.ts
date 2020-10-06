import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthenticationService } from '../../shared/auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { SystemService } from 'src/app/shared/system.service';
import { System, SystemsResponse } from 'src/app/shared/models/system';
import { User } from './user';

@Component({
  selector: 'hm-signup',
  templateUrl: './Signup.component.html',
  styleUrls: ['./Signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  submitted = false;
  user: User;
  returnUrl: string;
  error: string;
  currentUser: any;
  currentSystem: System;


  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.user = new User();
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.signupForm = this.fb.group({
        FirstName: ['', [Validators.required, Validators.minLength(3)]],
        LastName: ['', [Validators.required, Validators.minLength(3)]],
        Email: ['', [Validators.required, Validators.email]],
        PhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        Username: ['', Validators.required],
        Password: ['', Validators.required],
        ConfirmPassword: ['', Validators.required]
    });
  }
   // convenience getter for easy access to form fields
   get f() { return this.signupForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.signupForm.invalid) {
          return;
      }
    }

   onReset() {
       this.submitted = false;
       this.signupForm.reset();
   }
   public back(): void {
    this.router.navigate(['auth/login']);
  }

  signUp() {
        this.loading = true;
        this.authService.signUp(this.user).subscribe(
          response => {
          console.log(this.user);
          console.log(response);
          if (response){
            if (response.code === '800.200.001') {
              Swal.fire(
                'Registration',
                'Your profile has been created',
                'success'
              );
              this.back();
            } else {
              Swal.fire(
                'Failed!',
                response.message,
                'error'
              );
              this.loading = false;
            }

          }else {
            Swal.fire(
              'Failed!',
              'The user could not be created.',
              'error'
            );
            this.loading = false;
          }
          });
  }
}
