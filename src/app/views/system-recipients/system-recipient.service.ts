import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LookUpService } from 'src/app/shared/look-up.service';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class SystemRecipientService {
constructor(private httpWrapperService: HttpWrapperService) { }
  public addSystemRecipient<T>(item): Observable<HttpResponse<T>> {
    const url = 'create_system_recipient/';
    return this.httpWrapperService.post<T>(url, item);
  }
  public deleteItem<T>(systemRecipientId): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('delete_system_recipient/', {systemRecipientId});
  }

  public getItem<T>(recipientId): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('get_system_recipient/', {recipientId});
  }

  public updateItem<T>(item): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('update_system_recipient/', item);
  }
}
