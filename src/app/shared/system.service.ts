import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap, filter} from 'rxjs/operators';
// import { runInThisContext } from 'vm';
import { environment } from '../../environments/environment';
import { HttpWrapperService } from './helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  // currentSystem: any;
  private currentSystemSubject: BehaviorSubject<any>;
  public currentSystem: Observable<any>;
  @Output() changeSystem: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient, private httpWrapperService: HttpWrapperService) {
    this.currentSystemSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentSystem')));
    this.currentSystem = this.currentSystemSubject.asObservable();
  }

  public getCurrentSystem() {
    return this.currentSystemSubject.value;
  }

  getSystems(): Observable<any> {
    return this.httpWrapperService.post('get_systems/');
  }

  getSystem(systemId: string): Observable<any> {
    return this.httpWrapperService.post('get_system/', {system_id: systemId});
  }

  createSystem(system: any): Observable<any> {
    return this.httpWrapperService.post('create_system/', system);
  }

  // setSystem(systemId: string) {
  //   return this.http.post<any>(environment.apiEndpoint + 'get_systems/', {}).pipe(
  //     map(systems => systems.data.filter(system => system.id === systemId)),
  //     tap(systems => {
  //       localStorage.setItem('currentSystem', JSON.stringify(systems[0])),
  //       this.changeSystem.emit(systems);
  //       window.location.reload();
  //     })
  //   );
  // }

  changesystem(systemId: string) {
    return this.httpWrapperService.post('get_system/', {system_id: systemId}).pipe(
      tap(system => {
        localStorage.setItem('currentSystem', JSON.stringify(system)),
        this.currentSystemSubject.next(system);
      })
    );
  }

  updateSystem(system: any) {
    return this.httpWrapperService.post('update_system/', system).pipe(
      tap(updatedSystem => {
        localStorage.setItem('currentSystem', JSON.stringify(updatedSystem));
        this.currentSystemSubject.next(system);
    }));
  }

  checkCurrentSystem() {
    if (localStorage.getItem('currentSystem') === null || localStorage.getItem('currentSystem') === 'undefined') {
      return false;
    } else {
      const system = JSON.parse(localStorage.getItem('currentSystem'));
      console.log(system ? 'true' : 'false');
      return system;
    }
  }

  setSystem() {
    return this.httpWrapperService.post('get_systems/', {}).pipe(
      map(systems => systems[0]),
      tap((system) => {
        localStorage.setItem('currentSystem', JSON.stringify(system));
        this.currentSystemSubject.next(system);
    }));
  }
}
