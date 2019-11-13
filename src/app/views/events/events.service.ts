import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from '../.././../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private http: HttpClient
  ) { }

  getEvents(): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'get_events/', {}).pipe(
      map(events => events.data)
    );
  }

  getEvent(eventId: string): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'get_event/', {
      event_id: eventId
    }).pipe(
      map(event => event.data));
  }
}
