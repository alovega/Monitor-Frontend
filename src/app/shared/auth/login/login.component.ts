import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { AuthenticationService } from '../authentication.service';
import { System, SystemsResponse } from '../../models/system';
import { SystemService } from '../../system.service';
import { ToastrService } from 'ngx-toastr';

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
    private systemService: SystemService,
    private toastr: ToastrService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    console.log(this.currentSystem);
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.authService.currentUser.subscribe((user) => this.currentUser = user);
    let body = document.getElementsByTagName('body')[0];
    if (this.currentUser) {
      body.classList.remove('body-logged-out');
    } else {
      body.classList.add('body-logged-out');
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              console.log(data);
              if (data) {
                console.log(this.currentSystem);
                if (!this.currentSystem) {
                  this.systemService.getSystems().subscribe(
                    (res: SystemsResponse) => {
                      if (res.code === '800.200.001') {
                        this.currentSystem = res.data[0];
                        localStorage.setItem('currentSystem', JSON.stringify(this.currentSystem));
                        this.router.navigate([this.returnUrl]);
                      } else {
                        this.toastr.error('An error occurred. Try again later', 'Error!');
                      }
                      // window.location.reload();
                    }
                  );
                } else {
                  this.router.navigate([this.returnUrl]);
                }
              } else {
                Swal.fire(
                  '',
                  'Invalid credentials supplied. Try again',
                  'warning'
                );
                this.loading = false;
                this.loginForm.reset();
              }
            },
            error => {
                this.error = error;
                Swal.fire(
                  'Error',
                  'An error has occurred',
                  'error');
                this.loading = false;
            });
}

}
