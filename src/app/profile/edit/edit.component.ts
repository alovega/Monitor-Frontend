import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'hm-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  profileUpdateForm: FormGroup;
  submitted = false;
  data: any;
  constructor(private fb: FormBuilder, private profileService: ProfileService, private location: Location,
              private router: Router) {
    this.data = new Profile();
    this.createForm();
   }

  ngOnInit() {
    this.profileService.getLoggedInUserDetail().subscribe(
      (data) => {
          this.data = data;
          console.log(this.data);
        });
  }
  createForm() {
    this.profileUpdateForm = this.fb.group({
        FirstName: ['', [Validators.required, Validators.minLength(3)]],
        LastName: ['', [Validators.required, Validators.minLength(3)]],
        Email: ['', [Validators.required, Validators.email]],
        PhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        Username: ['', Validators.required],
    });
  }
   // convenience getter for easy access to form fields
   get f() { return this.profileUpdateForm.controls; }

   onSubmit() {
       this.submitted = true;

       // stop here if form is invalid
       if (this.profileUpdateForm.invalid) {
           return;
       }
      }

   onReset() {
       this.submitted = false;
       this.profileUpdateForm.reset();
   }
   public back(): void {
    this.router.navigate(['profile/details']);
  }
   update() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.data[0].token =  user.token;
    Swal.fire({
      title: 'Are you sure',
      text: 'You want to update your details',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update the user details',
      cancelButtonText: 'No, cancel the update'
    }).then((result) => {
      if (result.value) {
        this.profileService.updateLoggedInUser(this.data[0]).subscribe(
          response => {
          console.log(this.data[0]);
          console.log(response);
          if (response.code === '800.200.001') {
              Swal.fire(
                'updated',
                'Your details has been updated',
                'success'
              );
            } else {
              Swal.fire(
                'Failed!',
                'The user could not be updated.',
                'error'
              );
            }
          }
        );
        this.back();
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
