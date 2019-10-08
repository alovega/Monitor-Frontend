import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Incident } from './incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  incidentsUrl = 'assets/demo-incidents.json';
  constructor(
    private http: HttpClient
  ) { }

  public getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.incidentsUrl);
  }

  public getOpenIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.incidentsUrl);
  }

  public getRealtimeIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.incidentsUrl);
  }

  public getScheduledIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.incidentsUrl);
  }

  public getIncident(incidentId: string): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.incidentsUrl).pipe(
      // tap(incident => console.log(incidentId))
    );
  }
}
