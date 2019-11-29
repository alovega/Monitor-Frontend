import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { HttpWrapperService } from './helpers/http-wrapper.service';
import { System } from './models/system';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  public currentSystemSubject: BehaviorSubject<System>;
  public currentSystem: Observable<System>;
  constructor(
    private http: HttpClient,
    private httpWrapperService: HttpWrapperService) {
    this.currentSystemSubject = new BehaviorSubject<System>(JSON.parse(localStorage.getItem('currentSystem')));
    this.currentSystem = this.currentSystemSubject.asObservable();
  }

  public getCurrentSystem() {
    return this.currentSystemSubject.value;
  }

  getSystems<T>(): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('get_systems/');
  }

  getSystem<T>(systemId: string): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('get_system/', {id: systemId});
  }

  createSystem<T>(system: any): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('create_system/', system);
  }

  updateSystem<T>(systemId: string, body: any): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('update_system/', {id: systemId, ...body});
  }

  checkCurrentSystem() {
    if (localStorage.getItem('currentSystem') === null || localStorage.getItem('currentSystem') === 'undefined') {
      return false;
    } else {
      const system = JSON.parse(localStorage.getItem('currentSystem'));
      return system;
    }
  }

}
