import { Injectable } from '@angular/core';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IncidentHistoryService {

  constructor(
    private httpWrapper: HttpWrapperService
  ) { }

  public getIncident<T>(incidentId: string): Observable<HttpResponse<T>> {
    return this.httpWrapper.post('get_incident/', {incident_id: incidentId});
  }
}
