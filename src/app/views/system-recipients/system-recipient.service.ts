import { Injectable } from '@angular/core';
import { Observable, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, tap, retry, map} from 'rxjs/operators';
import { SystemRecipient } from './system-recipient';
import { LookUpService } from 'src/app/shared/look-up.service';
import { environment } from 'src/environments/environment';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class SystemRecipientService {
constructor(private http: HttpClient, private lookUpService: LookUpService, private httpWrapperService: HttpWrapperService) { }
  public addSystemRecipient<T>(item): Observable<HttpResponse<T>> {
    const url = 'create_system_recipient/';
    return this.httpWrapperService.post<T>(url, item);
  }
  public deleteItem(systemRecipientId): Observable<any> {
    const systemRecipientUrl = environment.apiEndpoint + 'delete_system_recipient/';
    return this.http.post(systemRecipientUrl, {systemRecipientId});
  }

  public getItem<T>(recipientId): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('get_system_recipient/', {recipientId});
  }

  public updateItem<T>(item): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('update_system_recipient/', item);
    // const systemRecipientUrl = environment.apiEndpoint + 'update_system_recipient/';
    // return this.http.post<any>(systemRecipientUrl, item).pipe(
    //   retry(2),
    // );
  }
}
