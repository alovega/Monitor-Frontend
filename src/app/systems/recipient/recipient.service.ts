import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, retry, map} from 'rxjs/operators';
import { LookUpService } from 'src/app/shared/look-up.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipientService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Output() changeSystem: EventEmitter<boolean> = new EventEmitter();

constructor(private http: HttpClient, private lookUpService: LookUpService) { }

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

    public getRecipients(): Observable<any> {
      const RecipientUrl = environment.apiEndpoint + 'get_recipients/';
      return this.http.post<any>(RecipientUrl, this.httpOptions).pipe (
        map(response => response.data),
        retry(2),
        catchError(this.handleError));
    }
    public getRecipient(recipientId): Observable<any> {
      const RecipientUrl = environment.apiEndpoint + 'get_recipient/';
      return this.http.post<any>(RecipientUrl, {recipientId}, this.httpOptions).pipe (
        map(response => response),
        retry(2),
        catchError(this.handleError));
    }
    public addRecipient(item): Observable<any> {
      const RecipientUrl = environment.apiEndpoint + 'create_recipient/';
      return this.http.post<any>(RecipientUrl, item, this.httpOptions).pipe(
        retry(2),
        catchError(this.handleError)
      );
    }
    public updateRecipient(item): Observable<any> {
      const RecipientUrl = environment.apiEndpoint + 'update_recipient/';
      return this.http.post<any>(RecipientUrl, item, this.httpOptions).pipe(
        retry(2),
        catchError(this.handleError)
      );
    }
    public deleteItem(recipientId): Observable<any> {
      const RecipientUrl = environment.apiEndpoint + 'delete_recipient/';
      return this.http.post<any>( RecipientUrl, {recipientId}, this.httpOptions).pipe(
        retry(2),
        catchError(this.handleError)
      );
    }
    public getUsers(): Observable<any> {
      return this.lookUpService.getUsers();
    }
    public getStates(): Observable<any> {
      return this.lookUpService.getStates();
    }

}
