import { Injectable } from '@angular/core';
import {  throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry, tap} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { System } from './models/system';


@Injectable({
  providedIn: 'root'
})
export class LookUpService {
  Url = 'http://localhost:8000/api/get_lookup';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
  };
  public getSystems(){

    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.systems,retry(2)),
      catchError(this.handleError)
    );
  }
  public getStates() {

    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.states.filter( state => state['name'] === 'Active'|| state['name'] === 'Disabled' ),retry(2)),
      catchError(this.handleError)
    );
  }

  public getEndpointType() {

    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.endpoint_types, retry(2)),
      catchError(this.handleError)
    );
  }
  public getEscalationLevel(){

    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.escalation_levels,retry(2)),
      catchError(this.handleError)
    );
  }
  public getNotificationType(){

    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.notification_types,retry(2)),
      catchError(this.handleError)
    );
  }
  public getEventType(){

    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.event_types,retry(2)),
      catchError(this.handleError)
    );
  }
  public getUsers(){

    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.users,retry(2)),
      catchError(this.handleError)
    );
  }
  public getIncidentType(){

    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.incident_types,retry(2)),
      catchError(this.handleError)
    );
  }

  public getEndpointStates(): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'get_lookup', {}).pipe(
      tap(res => console.log(res)),
      map((response: any) => response.data.endpoint_states)
    );
  }
}
