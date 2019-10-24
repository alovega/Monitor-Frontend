import { Injectable,Output, EventEmitter } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notificationUrl = 'http://localhost:8000/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Output() changeSystem: EventEmitter<boolean> = new EventEmitter();
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
  public getEmailNotifications(system_id): Observable<any> {

    return this.http.post<any>(this.notificationUrl + '/get_notifications/', {
      system_id: system_id,
    }).pipe( 
      map(response => response.data.notifications.filter(data => data.notification_type__name === 'Email'),
      retry(2)
    ),catchError(this.handleError))
  }
  public getSmsNotifications(system_id): Observable<any> {

    return this.http.post<any>(this.notificationUrl + '/get_notifications/', {
      system_id: system_id,
    }).pipe( 
      map(response => response.data.notifications.filter(data => data.notification_type__name === 'Sms'),
      retry(2)
    ),catchError(this.handleError))
  }
}
