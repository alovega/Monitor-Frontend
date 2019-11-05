import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, filter, tap, map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Incident } from './incident';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class IncidentService {
  incidentsUrl = 'assets/demo-incidents.json';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded'})
  };
  token = 'MmVmZWQzYTdhNGY2ZjMxNTE4NGQ1ZWZlOTk5MDA3';
  clientId = '3cd49364-721a-4d3f-8bfa-141d93d6a8f7';

  @Output() changeSystem: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) {}

  createIncident(incident: any): Observable<Incident> {
    return this.http.post<Incident>(environment.apiEndpoint + 'create_incident/', incident).pipe(
      tap(result => console.log(result))
    );
  }

  getIncidents(): Observable<Incident[]> {
    return this.http.post<any>(environment.apiEndpoint + 'get_incidents/', {
    }).pipe(
      map(incidents => incidents.data),
      // tap(incidents => console.log(incidents))
    );
  }

  getOpenIncidents(currentSystem: any): Observable<Incident[]> {
    // console.log(currentSystem);
    return this.http.post<any>(environment.apiEndpoint + 'get_incidents/', {
    }).pipe(
      map(incidents => incidents.data.filter(incident => incident.status !== 'Completed').filter(
        incident => incident.status !== 'Resolved'
      )),
      // tap(incidents => console.log(incidents))
    );
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
      tap(incidents => console.log(incidents)),
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

  getIncident(incidentId: string, currentSystem: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/get_incident/', {
      system: currentSystem.name,
      incident_id: incidentId,
    }).pipe(
      map(incident => incident.data),
    );
  }

  updateIncident(incident: any): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'update_incident/', incident).pipe(
      tap(result => console.log(result) )
    );
  }

  deleteIncident(incidentId: string): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'delete_incident/', {
      incident_id: incidentId,
    }).pipe(
      // tap(result => console.log(result))
    );
  }

  getSystem() {
    this.changeSystem.emit(JSON.parse(localStorage.getItem('currentSystem')));
  }
}
