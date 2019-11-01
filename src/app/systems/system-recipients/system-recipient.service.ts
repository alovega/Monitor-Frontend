import { Injectable } from '@angular/core';
import { Observable, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, retry, map} from 'rxjs/operators';
import { SystemRecipient } from './system-recipient';
import { LookUpService } from 'src/app/shared/look-up.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemRecipientService {
  endpointUrl = 'http://localhost:8000/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
constructor(private http: HttpClient, private lookUpService: LookUpService) { }

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
}
public getEmailSystemRecipients(systemId): Observable<any> {
  const systemRecipientUrl = environment.apiEndpoint + 'get_system_recipients/';
  return this.http.post<any>(systemRecipientUrl, systemId).pipe(
    map(response => response.data,
    retry(2)),
    catchError(this.handleError),
  );
}
public getSmsSystemRecipients(systemId): Observable<any> {
  const systemRecipientUrl = environment.apiEndpoint + 'get_system_recipients/';
  return this.http.post<any>(systemRecipientUrl, systemId).pipe(
    map(response => response.data,
    retry(2)),
    catchError(this.handleError)
  );
}
public addSystemRecipient(item): Observable<any> {
  const systemRecipientUrl = environment.apiEndpoint + 'get_system_recipients/';
  return this.http.post<any>(this.endpointUrl + '/create_recipients/', item, this.httpOptions).pipe(
    retry(2),
    catchError(this.handleError)
  );
}
public deleteItem(recipientId): Observable<any> {
  return this.http.post<SystemRecipient>(this.endpointUrl + '/delete_recipient/', {recipientId}, this.httpOptions).pipe(
    retry(2),
    catchError(this.handleError)
  );
}

public getItem(recipientId): Observable<any> {
  const systemRecipientUrl = environment.apiEndpoint + 'get_system_recipient/';
  return this.http.post<any>(systemRecipientUrl, recipientId).pipe(
    map(response => response),
    retry(2),
    catchError(this.handleError)
  );
}

public updateItem(item): Observable<any> {
  const systemRecipientUrl = environment.apiEndpoint + 'update_system_recipient/';
  return this.http.post<SystemRecipient>(systemRecipientUrl, item, this.httpOptions).pipe(
    retry(2),
    catchError(this.handleError)
  );
}
public getSystemRecipients(systemId, escalationLevelId) {
  const systemRecipientUrl = environment.apiEndpoint + 'get_system_recipients/';
  return this.http.post<any>(systemRecipientUrl, {systemId, escalationLevelId}).pipe(
    map(response => response.data,
    retry(2)),
    catchError(this.handleError)
  );
}
public getLevels(): Observable<any> {
  return this.lookUpService.getEscalationLevel();
}
public getNotificationType(): Observable<any> {
  return this.lookUpService.getNotificationType();
}
public getUsers(): Observable<any> {
  return this.lookUpService.getUsers();
}
public getStates(): Observable<any> {
  return this.lookUpService.getStates();
}
}
