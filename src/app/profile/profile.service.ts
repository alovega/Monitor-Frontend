import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Page } from '../shared/data-table/model/page';
import { HttpWrapperService } from '../shared/helpers/http-wrapper.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
constructor(private http: HttpClient, private httpWrapper: HttpWrapperService) { }
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

  getLoggedInUserDetail(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const getUsersUrl = environment.apiEndpoint + 'get_logged_in_user_details/';
    return this.http.post<any>(getUsersUrl, {token: JSON.stringify(user.token)}).pipe(
      map(response => response.data)
    );
  }
  updateLoggedInUser(data): Observable<any> {
    const getUsersUrl = environment.apiEndpoint + 'edit_logged_in_user/';
    return this.http.post<any>(getUsersUrl, data, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getLoggedInuserRecentNotifications(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const getUsersUrl = environment.apiEndpoint + 'get_logged_in_user_recent_notifications/';
    return this.http.post<any>(getUsersUrl, {token: JSON.stringify(user.token)}).pipe(
      map(data => data.data)
    );
  }
  getLoggedInuserNotifications<T>(page: Page, options?: any): Observable<any> {
    const body = {
      page_size: `${page.size}`,
      page_number: `${page.offset + 1}`,
      order_column: `${page.orderBy}`,
      search_query: `${page.searchQuery}`,
      order_dir: `${page.orderDir}`
    };
    // return this.httpWrapperService.post<T>(page.url, {body});
    return this.httpWrapper.post<T>(page.url, {body: body, ...options});
  }
  UpdateLoggedInUserPassword(data): Observable<any> {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const getUsersUrl = environment.apiEndpoint + 'update_logged_in_user_password/';
    return this.http.post<any>(getUsersUrl, data).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

}

