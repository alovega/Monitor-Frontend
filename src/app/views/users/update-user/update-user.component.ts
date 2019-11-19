import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/views/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  constructor(
    public location: Location,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('user-id');
    this.usersService.getUser(this.userId).subscribe(
      (res: any) => {
        this.user = res;
        console.log(res);
      });
    this.updateUserForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstname: [''],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public back(): void {
    this.location.back();
  }

  onSubmit() {
    this.submitted = true;
    if (this.updateUserForm.invalid) {
      console.log('Invalid');
      return;
    }

    this.user.user_id = this.user.id;
    console.log(this.user);
    // if (t)
    this.usersService.updateUser(this.user).subscribe(
    (response: any) => {
        if (response.code === '800.200.001') {
          console.log(this.user);
          this.toastr.success('User updated successfully', 'User update success!');
          this.location.back();
        } else {
          this.toastr.error('User could not be updated', 'User update error!');
        }
      });
  }
}
