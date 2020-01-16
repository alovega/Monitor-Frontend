import { Injectable } from '@angular/core';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { System } from 'src/app/shared/models/system';

@Injectable({
  providedIn: 'root'
})
export class StatusPageService {
  currentSystemSubject: BehaviorSubject<any>;
  currentSystem: Observable<any>;
  constructor(
    private httpWrapper: HttpWrapperService,
  ) {
    this.currentSystemSubject = new BehaviorSubject<any>([]);
    this.currentSystem = this.currentSystemSubject.asObservable();
  }

  getSystem() {
    this.currentSystem.subscribe(
      (res) => console.log(res.value)
    );
    console.log(this.currentSystemSubject.value);
    return this.currentSystemSubject.value;
  }
  getAvailabilitySummary<T>(systemId: string, activeTab: string): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('get_availability_summary/', {
      system_id: systemId,
      interval: activeTab
    });
  }
}
