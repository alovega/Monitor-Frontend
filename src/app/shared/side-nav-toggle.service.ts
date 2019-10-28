import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavToggleService {
  showSideNav  = new Subject();
  currentStatus = true;
  constructor() { }

  toggleSideNav() {
    this.currentStatus = !this.currentStatus;
    this.showSideNav.next(this.currentStatus);
    // console.log(this.showSideNav);
  }
}
