import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  previousUrl: BehaviorSubject<any>;
  nextUrl: BehaviorSubject<any>;
  currentNextUrl: Observable<any>;
  currentPreviousUrl: Observable<any>;
  disabledNext: BehaviorSubject<boolean>;
  currentDisabledStatus: Observable<any>;
  constructor() {
    this.previousUrl = new BehaviorSubject<any>(null);
    this.nextUrl = new BehaviorSubject<any>(null);
    this.disabledNext = new BehaviorSubject<boolean>(true);
    this.currentDisabledStatus = this.disabledNext.asObservable();
    this.currentNextUrl = this.nextUrl.asObservable();
    this.currentPreviousUrl = this.previousUrl.asObservable();
   }

  getNextUrl() {
    return this.nextUrl.value;
  }

  getPreviousUrl() {
    return this.previousUrl.value;
  }

  getDisabledStatus() {
    return this.disabledNext.value;
  }
}
