import { Component, OnInit } from '@angular/core';
import {ProfileService} from './profile.service';
import { from } from 'rxjs';

@Component({
  selector: 'hm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  data:any

  constructor(private profileService:ProfileService) { }

  ngOnInit() {
    this.profileService.getLoggedInUserDetail().subscribe(
      (data) => {
        this.data = data
      }
    )

  }

}
