import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Endpoint } from './endpoint';
import { catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  endpointUrl = 'http://localhost:8000/endpoints';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { 
  }

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
  public getEndpoints(): Observable<Endpoint> {

    return this.http.get<Endpoint>(this.endpointUrl).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  public addEndpoints(item): Observable<Endpoint>{
    return this.http.post<Endpoint>(this.endpointUrl, JSON.stringify(item), this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  public deleteItem(id):Observable<Endpoint>{
    return this.http.delete<Endpoint>(this.endpointUrl + '/' + id, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  public getItem(id):Observable<Endpoint>{
    return this.http.get<Endpoint>(this.endpointUrl + '/' + id).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  public updateItem(id, item): Observable<Endpoint>{
    return this.http.put<Endpoint>(this.endpointUrl + '/' + id, JSON.stringify(item), this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
