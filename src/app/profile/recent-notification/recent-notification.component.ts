import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'hm-recent-notification',
  templateUrl: './recent-notification.component.html',
  styleUrls: ['./recent-notification.component.scss']
})
export class RecentNotificationComponent implements OnInit {
  data: any;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getLoggedInuserRecentNotifications().subscribe(
      (response) => {
        this.data = response;
      }
    );
  }

}
