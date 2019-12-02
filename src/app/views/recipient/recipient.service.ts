import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { catchError, retry, map} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpWrapperService } from '../../shared/helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class RecipientService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Output() changeSystem: EventEmitter<boolean> = new EventEmitter();

constructor(private http: HttpClient, private httpWrapperService: HttpWrapperService) { }

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
    public getRecipient<T>(recipientId): Observable<HttpResponse<T>> {
      const url = 'get_recipient/';
      return this.httpWrapperService.post<T>(url, {recipientId});
    }
    public addRecipient<T>(item): Observable<HttpResponse<T>> {
      const url = 'create_recipient/';
      return this.httpWrapperService.post<T>(url, item);
    }
    public updateRecipient<T>(item): Observable<HttpResponse<T>> {
      const url = 'update_recipient/';
      return this.httpWrapperService.post<T>(url, item);
    }
    public deleteItem<T>(recipientId): Observable<HttpResponse<T>> {
      // const RecipientUrl = environment.apiEndpoint + 'delete_recipient/';
      // return this.http.post<any>( RecipientUrl, {recipientId}, this.httpOptions).pipe(
      //   retry(2),
      //   catchError(this.handleError)
      // );
      const url = 'delete_recipient/';
      return this.httpWrapperService.post<T>(url, {recipientId});
    }
}
