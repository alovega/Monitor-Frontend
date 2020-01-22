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

  public addEndpoints<EndpointResponse>(item): Observable<HttpResponse<EndpointResponse>> {
    return this.httpWrapperService.post<EndpointResponse>('create_endpoints/', item);
  }
  // tslint:disable-next-line: variable-name
  public deleteItem<T>(endpoint_id): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('delete_endpoint/', {endpointId: endpoint_id});
  }
  getEndpoints<T>(systemId: string): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('get_endpoints/', {system: systemId});
  }
  public getItem<T>(endpoint_id): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('get_endpoint/', {endpointId: endpoint_id});
  }

  public updateItem<T>(item): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('update_endpoints/', item);
  }
  public getSystems(): Observable<any> {
    return this.lookUpService.getSystems();
  }
}
