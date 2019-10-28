import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Endpoint } from './endpoint';
import { catchError, retry,map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  endpointUrl = 'http://localhost:8000/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  token = 'MmVmZWQzYTdhNGY2ZjMxNTE4NGQ1ZWZlOTk5MDA3';
  clientId = '3cd49364-721a-4d3f-8bfa-141d93d6a8f7';
  @Output() changeSystem: EventEmitter<boolean> = new EventEmitter();

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
  public getEndpoints(system_id): Observable<any> {

    return this.http.post<any>(this.endpointUrl + '/get_endpoints/', {
      system_id: system_id,
    }).pipe( 
      map(endpoints => endpoints.data.endpoints,
      retry(2)
    ),catchError(this.handleError))
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

  public getItem(endpoint_id):Observable<any>{
    return this.http.post<any>(this.endpointUrl + '/get_endpoint/', {
      endpoint_id: endpoint_id,
    }).pipe(map(response => response.data.endpoint,
      retry(2)
    ),
      catchError(this.handleError)
    )
  }

  public updateItem(id, item): Observable<Endpoint>{
    return this.http.post<Endpoint>(this.endpointUrl + '/' + id, JSON.stringify(item), this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
