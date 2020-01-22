import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class SystemRecipientService {
constructor(private httpWrapperService: HttpWrapperService) { }
  public addSystemRecipient<T>(item): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('create_system_recipient/', item);
  }
  public deleteItem<T>(systemRecipientId): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('delete_system_recipient/', {system_recipient_id: systemRecipientId});
  }

  public getItem<T>(recipientId): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('get_system_recipient/', {recipient_id: recipientId});
  }

  public updateItem<T>(item): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('update_system_recipient/', item);
  }
}
