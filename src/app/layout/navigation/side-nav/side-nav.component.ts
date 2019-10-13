import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hm-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  currentSystemId: any;
  constructor() { }

  ngOnInit() {
    const currentSystem = JSON.parse(localStorage.getItem('currentSystem'));
    this.currentSystemId = currentSystem.id;
  }

}
