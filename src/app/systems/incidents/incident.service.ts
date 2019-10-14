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
  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded'})
  };
  token = 'YzExZDUzYjEyOGJiMDk4NjRiZjI0ZWYwMjIwYzJi';
  clientId = '3cd49364-721a-4d3f-8bfa-141d93d6a8f7';

  constructor(
    private http: HttpClient
  ) {}

  createIncident(formData: any): Observable<Incident> {
    const createIncidentUrl = 'http://127.0.0.1:8000/api/create_incident/';
    formData.append('system', 'Helaplan');
    formData.append('client_id', this.clientId);
    formData.append('token', this.token);

    for (let key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    return this.http.post<Incident>(createIncidentUrl, formData).pipe(
      tap(incident => console.log(incident))
    );
  }

  getIncidents(): Observable<Incident[]> {
    return this.http.post<any>('http://127.0.0.1:8000/api/get_incidents/', {
      client_id: '3cd49364-721a-4d3f-8bfa-141d93d6a8f7',
      system: 'Helaplan',
      token: 'YzExZDUzYjEyOGJiMDk4NjRiZjI0ZWYwMjIwYzJi',
      start_date: '2019-9-1',
      end_date: '2019-10-15'
    }).pipe(
      map(incidents => incidents.data),
      tap(incidents => console.log(incidents))
    );
  }

  getOpenIncidents(): Observable<Incident[]> {
    return this.http.post<any>('http://127.0.0.1:8000/api/get_incidents/', {
      client_id: '3cd49364-721a-4d3f-8bfa-141d93d6a8f7',
      system: 'Helaplan',
      token: 'YzExZDUzYjEyOGJiMDk4NjRiZjI0ZWYwMjIwYzJi',
      start_date: '2019-9-1',
      end_date: '2019-10-15'
    }).pipe(
      map(incidents => incidents.data.filter(incident => incident.status !== 'Completed').filter(
        incident => incident.status !== 'Resolved'
      )),
      tap(incidents => console.log(incidents))
    );
  }

  searchIncidents(searchKey: string): Observable<any> {
    return this.http.get<Incident[]>(this.incidentsUrl);
  }

  getRealtimeIncidents(): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/get_incidents/', {
      client_id: '3cd49364-721a-4d3f-8bfa-141d93d6a8f7',
      system: 'Helaplan',
      token: 'YzExZDUzYjEyOGJiMDk4NjRiZjI0ZWYwMjIwYzJi',
      start_date: '2019-9-1',
      end_date: '2019-10-15'
    }).pipe(
      map(incidents => incidents.data.filter(incident => incident.type === 'Realtime')),
      tap(incidents => console.log(incidents))
    );
  }

  getScheduledIncidents(): Observable<Incident[]> {
    return this.http.post<any>('http://127.0.0.1:8000/api/get_incidents/', {
      client_id: '3cd49364-721a-4d3f-8bfa-141d93d6a8f7',
      system: 'Helaplan',
      token: 'YzExZDUzYjEyOGJiMDk4NjRiZjI0ZWYwMjIwYzJi',
      start_date: '2019-9-1',
      end_date: '2019-10-15'
    }).pipe(
      map(incidents => incidents.data.filter(incident => incident.type === 'Scheduled')),
      tap(incidents => console.log(incidents))
    );
  }

  getIncident(incidentId: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/get_incident/', {
      client_id: '3cd49364-721a-4d3f-8bfa-141d93d6a8f7',
      system: 'Helaplan',
      incident_id: incidentId,
      token: 'YzExZDUzYjEyOGJiMDk4NjRiZjI0ZWYwMjIwYzJi'
    }).pipe(
      map(incident => incident.data),
      tap(incident => console.log(incident))
    );
  }

  updateIncident(formData: any): Observable<any> {
    formData.append('system', 'Helaplan');
    formData.append('client_id', '3cd49364-721a-4d3f-8bfa-141d93d6a8f7');
    formData.append('token', 'YzExZDUzYjEyOGJiMDk4NjRiZjI0ZWYwMjIwYzJi');
    return this.http.post<any>('http://127.0.0.1:8000/api/update_incident/', formData).pipe(
      map(incident => incident),
      tap(incident => console.log(incident))
    );
  }

  deleteIncident(IncidentId: string): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.incidentsUrl).pipe(

    );
  }
}
