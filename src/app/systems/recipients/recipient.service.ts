import { Injectable } from '@angular/core';
import { Observable,throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, retry, map} from 'rxjs/operators';
import{ Recipient } from './recipient';
import { LookUpService } from 'src/app/shared/look-up.service';

@Injectable({
  providedIn: 'root'
})
export class RecipientService {
  endpointUrl = 'http://localhost:8000/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
constructor(private http: HttpClient, private lookUpService:LookUpService) { }

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
public getEmailRecipients(system_id): Observable<any> {

  return this.http.post<any>(this.endpointUrl + '/' + 'get_recipients' + '/', {
    system_id: system_id,
  }).pipe(
    map(response => response.data.recipients.filter(data => data.notification_type__name === 'Email'),
    retry(2)),
    catchError(this.handleError),
   
  );
  
}
public getSmsRecipients(system_id): Observable<any> {

  return this.http.post<any>(this.endpointUrl + '/' + 'get_recipients' + '/', {
    system_id: system_id,
  }).pipe(
    map(response => response.data.recipients.filter(data => data.notification_type__name === 'Sms'),
    retry(2)),
    catchError(this.handleError)
  );
}
public addRecipient(item): Observable<any>{
  return this.http.post<any>(this.endpointUrl + '/create_recipients/', item, this.httpOptions).pipe(
    retry(2),
    catchError(this.handleError)
  );
}
public deleteItem(id):Observable<Recipient>{
  return this.http.delete<Recipient>(this.endpointUrl + '/' + id, this.httpOptions).pipe(
    retry(2),
    catchError(this.handleError)
  )
}

public getItem(recipient_id):Observable<any>{
  return this.http.post<any>(this.endpointUrl + '/get_recipient/',{
    recipient_id:recipient_id
  }).pipe(
    map(response => response,retry(2)),
    catchError(this.handleError)
  )
}

public updateItem(id, item): Observable<any>{
  return this.http.post<Recipient>(this.endpointUrl + '/update_recipient/', item, this.httpOptions).pipe(
    retry(2),
    catchError(this.handleError)
  )
}
public getLevels(){
  return this.lookUpService.getEscalationLevel()
}
public getNotificationType(){
  return this.lookUpService.getNotificationType()
}
public getUsers(){
  return this.lookUpService.getUsers()
}
public getStates(){
  return this.lookUpService.getStates()
}
}
