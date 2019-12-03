import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpWrapperService } from '../../shared/helpers/http-wrapper.service';
import { HttpResponse } from '@angular/common/http';
import { LookUpService } from 'src/app/shared/look-up.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  @Output() changeSystem: EventEmitter<boolean> = new EventEmitter();

  constructor(private lookUpService: LookUpService, public httpWrapperService: HttpWrapperService) {
  }
  public addEndpoints<T>(item): Observable<HttpResponse<T>> {
    const url = 'create_endpoints/';
    return this.httpWrapperService.post<T>(url, item);
  }
  // tslint:disable-next-line: variable-name
  public deleteItem<T>(endpoint_id): Observable<HttpResponse<T>> {
    const url = 'delete_endpoint/';
    return this.httpWrapperService.post<T>(url, {endpoint_id});
  }

  // tslint:disable-next-line: variable-name
  public getItem<T>(endpoint_id): Observable<HttpResponse<T>> {
    const url = 'get_endpoint/';
    return this.httpWrapperService.post<T>(url, {endpoint_id});
  }

  public updateItem<T>(item): Observable<HttpResponse<T>> {
    const url = 'update_endpoints/';
    return this.httpWrapperService.post<T>(url, item);
  }
  public getSystems(): Observable<any> {
    return this.lookUpService.getSystems();
  }
}
