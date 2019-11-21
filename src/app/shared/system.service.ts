import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  getSystems(): Observable<SystemsResponse> {
    return this.httpWrapperService.post('get_systems/').pipe();
  }

  getSystem(systemId: string): Observable<SystemResponse> {
    return this.httpWrapperService.post('get_system/', {id: systemId});
  }

  createSystem(system: any): Observable<SystemResponse> {
    return this.httpWrapperService.post('create_system/', system);
  }

  changesystem(systemId: string): Observable<SystemResponse> {
    return this.httpWrapperService.post('get_system/', {id: systemId}).pipe();
    //   tap(system => {
    //     localStorage.setItem('currentSystem', JSON.stringify(system)),
    //     this.currentSystemSubject.next(system);
    //   })
    // );
  }

  updateSystem(systemId: string, body: any) {
    return this.httpWrapperService.post('update_system/', {id: systemId, ...body}).pipe(
      tap(result => {
        console.log(result);
        localStorage.setItem('currentSystem', JSON.stringify(result.data));
        this.currentSystemSubject.next(result.data);
    }));
  }

  checkCurrentSystem() {
    if (localStorage.getItem('currentSystem') === null || localStorage.getItem('currentSystem') === 'undefined') {
      return false;
    } else {
      const system = JSON.parse(localStorage.getItem('currentSystem'));
      return system;
    }
  }

  setSystem(): Observable<SystemResponse> {
    return this.httpWrapperService.post('get_systems/', {}).pipe(
      map(systems => systems[0]),
      tap((system) => {
        localStorage.setItem('currentSystem', JSON.stringify(system));
        this.currentSystemSubject.next(system);
      }));
  }
}
