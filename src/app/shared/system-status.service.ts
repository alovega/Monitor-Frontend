import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SystemStatusService {

  constructor(
    private httpWrapperService: HttpWrapperService
  ) { }

  getCurrentStatus<T>(): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('get_system_status/');
  }

  getPastIncidents<T>(): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('past_incidents/');
  }

  getDashboardWidgetsData<T>(startDate, endDate): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('dashboard_widgets_data/', {date_from: startDate, date_to: endDate});
  }
}
