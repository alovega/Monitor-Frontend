import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
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
  user: any;
constructor(private httpWrapper: HttpWrapperService) {
  this.user = JSON.parse(localStorage.getItem('currentUser'));
 }

  getLoggedInUserDetail<T>(): Observable<HttpResponse<T>>  {
    return this.httpWrapper.post<T>('get_logged_in_user_details/', {token: JSON.stringify(this.user.token)});
  }
  updateLoggedInUser<T>(data): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('edit_logged_in_user/', data);
  }

  getLoggedInuserRecentNotifications<T>(): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<any>('get_logged_in_user_recent_notifications/', {token: JSON.stringify(this.user.token)});
  }
  getLoggedInuserNotifications<T>(page: Page, options?: any): Observable<HttpResponse<T>> {
    const body = {
      page_size: `${page.size}`,
      page_number: `${page.offset + 1}`,
      order_column: `${page.orderBy}`,
      search_query: `${page.searchQuery}`,
      order_dir: `${page.orderDir}`
    };
    return this.httpWrapper.post<T>(page.url, {body: body, ...options});
  }
  UpdateLoggedInUserPassword<T>(data): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<any>('update_logged_in_user_password/', data);
  }

}

