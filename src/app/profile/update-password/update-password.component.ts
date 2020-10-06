import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileResponse } from 'src/app/shared/models/profile-response';

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
    this.profileService.getLoggedInUserDetail<ProfileResponse>().subscribe(response => {
        if (response.ok) {
          if (response.body.code === '800.200.001') {
            console.log(response);
            this.data = response.body.data;
          } else {
            this.toastr.error('Profile get failed', 'Get Profile error');
          }
        } else {
          // TODO: Add error checks
        }
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
          this.profileService.UpdateLoggedInUserPassword<ProfileResponse>(this.profile).subscribe(
            response => {
            if (response.body.code === '800.200.001') {
                Swal.fire(
                  'updated',
                  'Your password has been updated successfully',
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
