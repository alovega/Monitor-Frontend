import { Component, OnInit } from '@angular/core';
import {ProfileService} from './profile.service';
import { from } from 'rxjs';
import { ProfileResponse } from '../shared/models/profile-response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  data: any;

  constructor(private profileService: ProfileService, private toastr: ToastrService) { }

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
  }

