import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { getMatScrollStrategyAlreadyAttachedError } from '@angular/cdk/overlay/typings/scroll/scroll-strategy';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {
  constructor(
    private http: HttpClient
  ) { }

  getErrorRates(startDate, endDate): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'get_error_rates/', {
      start_date: startDate, end_date: endDate
    }).pipe(
      map(response => response.data)
    );
  }

  getResponseTimes(systemId): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'get_response_time_data/', {systemId}).pipe(
      map(response => response.data)
    );
  }
}
