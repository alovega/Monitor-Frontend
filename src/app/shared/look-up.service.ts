import { Injectable } from '@angular/core';
import {  throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry, tap} from 'rxjs/operators';
import { HttpWrapperService } from '../shared/helpers/http-wrapper.service';


@Injectable({
  providedIn: 'root'
})
export class LookUpService {
  Url = 'http://127.0.0.1:8000/api/get_lookup/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private httpWrapperService: HttpWrapperService) { }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    // console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(error);
  }
  // return an observable with a user-facing error message
  return throwError(error);
  }
  public getSystems() {

    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.systems),
      retry(2),
      catchError(this.handleError)
    );
  }
  public getStates() {
    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.states.filter(state => state.name === 'Active' || state.name === 'Disabled')),
      retry(2),
      catchError(this.handleError)
    );
  }

  public getEndpointType<T>(): Observable<HttpResponse<T>> {
    return this.httpWrapperService.get<T>('get_lookup/');
  }
  public getEscalationLevel() {

    return this.http.get<any>(this.Url).pipe(
      tap(res => console.log(res)),
      map(response => response.data.escalation_levels),
      retry(2),
      catchError(this.handleError)
    );
  }
  public getNotificationType() {

    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.notification_types),
      retry(2),
      catchError(this.handleError)
    );
  }
  public getEventType() {

    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.event_types),
      retry(2),
      catchError(this.handleError)
    );
  }
  public getUsers() {

    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.users),
      retry(2),
      catchError(this.handleError)
    );
  }
  public getIncidentType() {

    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.incident_types),
      retry(2),
      catchError(this.handleError)
    );
  }

  public getRealtimeIncidentStates() {
    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.realtime_incident_states),
      retry(2),
      catchError(this.handleError)
    );
  }

  public getScheduledIncidentStates() {
    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.scheduled_incident_states),
      retry(2),
      catchError(this.handleError)
    );
  }

  public getRecipients() {

    return this.http.get<any>(this.Url).pipe(
      map(response => response.data.recipients),
      retry(2),
      catchError(this.handleError)
    );
  }

  public getEndpointStates<LookUpResponse>(): Observable<HttpResponse<LookUpResponse>> {
    return this.httpWrapperService.get<LookUpResponse>('get_lookup/');
  }
  public getLookUpData<LookUpResponse>(): Observable<HttpResponse<LookUpResponse>> {
    return this.httpWrapperService.get<LookUpResponse>('get_lookup/');
  }
}
