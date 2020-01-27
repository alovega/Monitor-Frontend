import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, retry, map} from 'rxjs/operators';
import { Page } from 'src/app/shared/data-table/model/page';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notificationUrl = 'http://localhost:8000/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Output() changeSystem: EventEmitter<boolean> = new EventEmitter();
  constructor(private http: HttpClient, private httpWrapper: HttpWrapperService) { }

  public getNotificationsTableData<T>(page: Page, options?: any): Observable<HttpResponse<T>> {
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
}
