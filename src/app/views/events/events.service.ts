import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private httpWrapper: HttpWrapperService
  ) { }

  getEvents<T>(): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('get_events/');
  }

  getEvent<T>(eventId: string): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('get_event/', {event_id: eventId});
  }
}
