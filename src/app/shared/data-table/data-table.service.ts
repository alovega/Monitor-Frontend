import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { PagedData } from './model/paged-data';
import { Page } from './model/page';

import data from '../../../assets/data.json';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataTableService {
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
}
  public reloadTable(page: Page): Observable<any> {

    // NOTE: those params key values depends on your API!
    const endpointUrl = environment.apiEndpoint + 'get_table_data/';
    const params = new HttpParams()
      .set('orderColumn', `${page.orderBy}`)
      .set('orderDir', `${page.orderDir}`)
      .set('pageNumber', `${page.offset + 1}`)
      .set('pageSize', `${page.size}`);
    const body = {
      pageSize: params.get('pageSize'),
      pageNumber: params.get('pageNumber'),
      orderColumn: params.get('orderColumn'),
      orderDir: params.get('orderDir')
    };
    console.log({body});
    return this.http.post<any>(endpointUrl, {body}).pipe(
      map(
        response => response,
        retry(2)),
      catchError(this.handleError));
  }
}
