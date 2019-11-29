import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { AuthenticationService } from '../../shared/auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { SystemService } from 'src/app/shared/system.service';
import { System, SystemsResponse } from 'src/app/shared/models/system';

@Component({
  selector: 'hm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  currentUser: any;
  currentSystem: System;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private systemService: SystemService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value).subscribe(
      data => {
        if (data) {
          if (!this.currentSystem) {
            this.systemService.getSystems<SystemsResponse>()
            .subscribe(response => {
              if (response.ok) {
                if (response.body.code === '800.200.001') {
                  this.currentSystem = response.body.data[0];
                  localStorage.setItem('currentSystem', JSON.stringify(this.currentSystem));
                  this.systemService.currentSystemSubject.next(this.currentSystem);
                  this.router.navigate([this.returnUrl]);
                } else {
                  this.toastr.error('An error occurred. Try again later', 'Error!');
                }
              } else {
                // TODO: Add error checks
              }
                // window.location.reload();
              }
            );
          } else {
            this.router.navigate([this.returnUrl]);
          }
        } else {
          this.toastr.warning('Invalid credentials supplied. Try again', 'Warning');
          this.loading = false;
        }
      },
      error => {
          this.error = error;
          this.toastr.error('Could not login at this time. Try again later', 'Error');
          this.loading = false;
      });
}

}
