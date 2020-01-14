import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavToggleService {
  showSideNav  = new Subject();
  currentStatus = true;
  constructor() { }

  toggleSideNav(status ?: boolean) {
    if (status != null) {
      this.currentStatus = status;
    } else {
      this.currentStatus = !this.currentStatus;
    }
    this.showSideNav.next(this.currentStatus);
    // console.log(this.showSideNav);
  }
}
