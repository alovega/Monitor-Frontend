import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, filter, tap, map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Incident } from './incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  incidentsUrl = 'assets/demo-incidents.json';
  httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Cache-Control': 'no-cache'
  });

  constructor(
    private http: HttpClient
  ) { }

  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.incidentsUrl);
  }

  searchIncidents(searchKey: string): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.incidentsUrl);
  }

  getRealtimeIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.incidentsUrl);
  }

  getScheduledIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.incidentsUrl);
  }

  getIncident(incidentId: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/get_incident/', {
      client_id: '3cd49364-721a-4d3f-8bfa-141d93d6a8f7',
      system: 'Helaplan',
      incident_id: '3ec2e845-cf48-41c7-96bc-739342973480',
      token: 'ODNkNDQyNzJhZmQ1NTdkOWU5NWUzMWFjZDU4NzM2'
    }).pipe(
      map(incident => incident.data),
      tap(incident => console.log(incident))
    );
  }

  deleteIncident(IncidentId: string): Observable<Incident[]>{
    return this.http.get<Incident[]>(this.incidentsUrl).pipe(

    )
  }
}
