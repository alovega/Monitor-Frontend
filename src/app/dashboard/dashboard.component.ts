import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public map: any = {lat: 40.725118, long: -73.997699};
  constructor() { }

  ngOnInit() {
  }
}
