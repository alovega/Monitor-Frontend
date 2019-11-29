import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, tap, filter} from 'rxjs/operators';
// import { runInThisContext } from 'vm';
import { environment } from '../../environments/environment';
import { HttpWrapperService } from './helpers/http-wrapper.service';
import { System, SystemResponse, SystemsResponse } from './models/system';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  // currentSystem: any;
  public currentSystemSubject: BehaviorSubject<any>;
  public currentSystem: Observable<any>;
  @Output() changeSystem: EventEmitter<boolean> = new EventEmitter();

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

  changesystem<T>(systemId: string): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('get_system/', {id: systemId});
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

  setSystem<T>(): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('get_systems/', {}).pipe(
      map(systems => systems[0]),
      tap((system) => {
        localStorage.setItem('currentSystem', JSON.stringify(system));
        this.currentSystemSubject.next(system);
      }));
  }
}
