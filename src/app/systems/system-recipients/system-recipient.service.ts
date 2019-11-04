import { Injectable } from '@angular/core';
import { Observable, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, retry, map} from 'rxjs/operators';
import { SystemRecipient } from './system-recipient';
import { LookUpService } from 'src/app/shared/look-up.service';
import { environment } from 'src/environments/environment';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class SystemRecipientService {
  endpointUrl = 'http://localhost:8000/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
constructor(private http: HttpClient, private lookUpService: LookUpService, private httpWrapperService: HttpWrapperService) { }
public addSystemRecipient(item): Observable<any> {
  return this.httpWrapperService.post('create_recipients/', {item});
}
public deleteItem(systemRecipientId): Observable<any> {
  return this.httpWrapperService.post('delete_recipient/', {systemRecipientId});
}

public getItem(systemRecipientId): Observable<any> {
  return this.httpWrapperService.post('get_system_recipient/', {systemRecipientId});
}

public updateItem(item): Observable<any> {
  return this.httpWrapperService.post('update_system_recipient/', item);
}
public getSystemRecipients(systemId, escalationLevelId) {
  this.httpWrapperService.post('get_system_recipients', {systemId, escalationLevelId});
}
public getLevels(): Observable<any> {
  return this.lookUpService.getEscalationLevel();
}
public getNotificationType(): Observable<any> {
  return this.lookUpService.getNotificationType();
}
public getUsers(): Observable<any> {
  return this.lookUpService.getUsers();
}
public getStates(): Observable<any> {
  return this.lookUpService.getStates();
}
}
