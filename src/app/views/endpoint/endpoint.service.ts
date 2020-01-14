import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Endpoint } from './endpoint';
import { catchError, retry, map, tap} from 'rxjs/operators';
import { LookUpService } from 'src/app/shared/look-up.service';
import { environment } from 'src/environments/environment';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  endpointUrl = 'http://localhost:8000/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Output() changeSystem: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private lookUpService: LookUpService,
    private httpWrapper: HttpWrapperService) {
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
  }
  getEndpoints<T>(systemId: string): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('get_endpoints/', {system: systemId});
  }

  public addEndpoints(item): Observable<any> {
    return this.http.post<any>(this.endpointUrl + '/create_endpoints/', item, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  public deleteItem(endpoint_id): Observable<any> {
    return this.http.post<Endpoint>(this.endpointUrl + '/delete_endpoint/', {endpoint_id}, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  public getItem(endpoint_id): Observable<any> {
    return this.http.post<any>(this.endpointUrl + '/get_endpoint/',  {endpoint_id}).pipe(
      map(response => response,
      retry(2)
    ),
      catchError(this.handleError)
    );
  }

  public updateItem(item): Observable<any> {
    return this.http.post<Endpoint>(this.endpointUrl + '/update_endpoints/', item, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  public getStates(): Observable<any> {
    return this.lookUpService.getStates();
  }
  public getEndpointTypes(): Observable<any> {
    return this.lookUpService.getEndpointType();
  }
  public getSystems(): Observable<any> {
    return this.lookUpService.getSystems();
  }
}
