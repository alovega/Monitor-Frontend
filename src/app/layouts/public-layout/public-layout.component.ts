import { Component, OnInit } from '@angular/core';
import { StatusPageService } from 'src/app/views/public-dashboard/status-page.service';

@Component({
  selector: 'hm-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent implements OnInit {
  systemStatus: any;
  constructor(
    private statusPageService: StatusPageService
  ) { }

  ngOnInit() {
    this.statusPageService.currentSystem.subscribe(
      (response) => this.systemStatus = response
    );
    // console.log(this.systemStatus);
  }
}
