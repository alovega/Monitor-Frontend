import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { HttpWrapperService } from './helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {
  constructor(
    private http: HttpClient,
    private httpWrapper: HttpWrapperService
  ) { }

  getErrorRates<T>(startDate, endDate): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('get_error_rates/', {
      start_date: startDate, end_date: endDate
    });
  }

  getResponseTimes<T>(): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('get_response_time_data/');
  }
}
