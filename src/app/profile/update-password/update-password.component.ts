import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hm-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  passwordUpdateForm: FormGroup;
  submitted = false;
  profile: Profile;
  confirmPassword: any;
  data: any;
  constructor(private fb: FormBuilder, private profileService: ProfileService, private location: Location,
              private router: Router, private toastr: ToastrService) {
    this.profile = new Profile();
    this.createForm();
   }

  ngOnInit() {
    this.profileService.getLoggedInUserDetail().subscribe(
      (data) => {
          this.data = data;
        });
  }
  createForm() {
    this.passwordUpdateForm = this.fb.group({
        CurrentPassword: ['', Validators.required],
        Password: ['', Validators.required],
        ConfirmPassword: ['', Validators.required],
    });
  }

  get f() { return this.passwordUpdateForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.passwordUpdateForm.invalid) {
          return;
      }
    }
    public back(): void {
      this.router.navigate(['dashboard/profile']);
    }
    update() {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      this.profile.token =  user.token;
      Swal.fire({
        title: 'Are you sure',
        text: 'You want to update your password',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update the user password',
        cancelButtonText: 'No, cancel the update'
      }).then((result) => {
        if (result.value) {
          this.profileService.UpdateLoggedInUserPassword(this.profile).subscribe(
            response => {
            if (response.code === '800.200.001') {
                Swal.fire(
                  'updated',
                  'Your password has been updated',
                  'success'
                );
              } else {
                Swal.fire(
                  'Failed!',
                  'The user password could not be updated.',
                  'error'
                );
              }
            }
          );
          this.location.back();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            '',
            'error'
          );
        }
      });
    }

}
