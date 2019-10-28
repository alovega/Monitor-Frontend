import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { map, tap} from 'rxjs/operators';

@Component({
  selector: 'hm-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  data: any

  constructor(private profileService:ProfileService) { }

  ngOnInit() {
    this.profileService.getLoggedInUserDetail().subscribe(
    (data) => {
        this.data = data
        console.log(this.data)
      })
  }

}
