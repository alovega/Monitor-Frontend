import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap, filter} from 'rxjs/operators';
// import { runInThisContext } from 'vm';
import { environment } from '../../environments/environment';
import { HttpWrapperService } from './helpers/http-wrapper.service';
import { System } from './models/system';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  // currentSystem: any;
  private currentSystemSubject: BehaviorSubject<any>;
  public currentSystem: Observable<any>;
  @Output() changeSystem: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private httpWrapperService: HttpWrapperService) {
    this.currentSystemSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentSystem')));
    this.currentSystem = this.currentSystemSubject.asObservable();
  }

  public adapt(system: any): System {
    return new System(
        system.id, system.name, system.description, system.admin__id, system.code, system.version,
        new Date(system.date_created), new Date(system.date_modified), system.state__name
    );
  }

  public getCurrentSystem() {
    return this.currentSystemSubject.value;
  }

  getSystems(): Observable<any> {
    // console.log('Got systems');
    return this.httpWrapperService.post('get_systems/');
  }

  getSystem(systemId: string): Observable<any> {
    return this.httpWrapperService.post('get_system/', {id: systemId});
  }

  createSystem(system: any): Observable<any> {
    return this.httpWrapperService.post('create_system/', system);
  }

  changesystem(systemId: string) {
    return this.httpWrapperService.post('get_system/', {id: systemId}).pipe(
      tap(system => {
        localStorage.setItem('currentSystem', JSON.stringify(this.adapt(system))),
        this.currentSystemSubject.next(this.adapt(system));
      })
    );
  }

  updateSystem(systemId: string, system: any) {
    return this.httpWrapperService.post('update_system/', {id: systemId, system}).pipe(
      tap(updatedSystem => {
        console.log(updatedSystem);
        localStorage.setItem('currentSystem', JSON.stringify(this.adapt(updatedSystem)));
        this.currentSystemSubject.next(this.adapt(system));
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

  setSystem() {
    return this.httpWrapperService.post('get_systems/', {}).pipe(
      map(systems => systems[0]),
      tap((system) => {
        localStorage.setItem('currentSystem', JSON.stringify(this.adapt(system)));
        this.currentSystemSubject.next(this.adapt(system));
    }));
  }
}
