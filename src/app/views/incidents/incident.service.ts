import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Incident } from './incident';
import { environment } from '../../../environments/environment';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';
import { Page } from 'src/app/shared/data-table/model/page';

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

  getIncidentsTableData<T>(page: Page, options?: any): Observable<HttpResponse<T>> {
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
