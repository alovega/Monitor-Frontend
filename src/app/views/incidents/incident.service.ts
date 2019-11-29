import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, filter, tap, map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Incident, IncidentResponse } from './incident';
import { environment } from '../../../environments/environment';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})

export class IncidentService {

  constructor(
    private http: HttpClient,
    private httpWrapper: HttpWrapperService
  ) {}

  createIncident<T>(incidentType: string, body: any): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('create_incident/', {incident_type: incidentType, ...body});
  }

  getIncidents<T>(options?: any): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('get_incidents/', options);
  }

  // getOpenIncidents<T>(): Observable<HttpResponse<T>> {
  //   return this.httpWrapper.post<T>('get_incidents/');
  //   .pipe(
  //     map(incidents => incidents.data.filter(incident => incident.status !== 'Completed').filter(
  //       incident => incident.status !== 'Resolved'
  //     )),
  //     // tap(incidents => console.log(incidents))
  //   );
  // }

  searchIncidents(searchKey: string): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'get_incidents/', {
    }).pipe(
      map(incidents => incidents.data),
      // tap(incidents => console.log(incidents))
    );
  }

  getRealtimeIncidents(): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'get_incidents/', {
    }).pipe(
      map(incidents => incidents.data.filter(incident => incident.type === 'Realtime')),
    );
  }

  getScheduledIncidents(): Observable<Incident[]> {
    return this.http.post<any>(environment.apiEndpoint + 'get_incidents/', {
    }).pipe(
      map(incidents => incidents.data.filter(incident => incident.type === 'Scheduled')),
      // tap(incidents => console.log(incidents))
    );
  }

  getIncident<T>(incidentId: string): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('get_incident/', {incident_id: incidentId});
  }

  updateIncident<T>(incidentId: string, body: any): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('update_incident/', {incident_id: incidentId, ...body});
  }

  deleteIncident(incidentId: string): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'delete_incident/', {
      incident_id: incidentId,
    }).pipe(
      // tap(result => console.log(result))
    );
  }
}
