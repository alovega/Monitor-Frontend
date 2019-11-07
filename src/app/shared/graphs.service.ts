import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {
  constructor(
    private http: HttpClient
  ) { }

  getErrorRates(): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'get_error_rates/', {}).pipe(
      map(response => response.data)
    )
  }

  getSystemStatus(): Observable<any>{
    return this.http.post<any>(environment.apiEndpoint + 'get_system_status/', {}).pipe(
      map(response => response.data)
    )
  }
}
