import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { HttpWrapperService } from './helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {
  constructor(
    private http: HttpClient,
    private httpWrapper: HttpWrapperService
  ) { }

  getErrorRates(startDate, endDate): Observable<any> {
    return this.httpWrapper.post('get_error_rates/', {start_date: startDate, end_date: endDate});
  }

  getResponseTimes(): Observable<any> {
    return this.httpWrapper.post('get_response_time_data/');
    return this.http.post<any>(environment.apiEndpoint + 'get_response_time_data/', {systemId}).pipe(
      map(response => response.data)
    );
  }
}
