import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap, filter} from 'rxjs/operators';
// import { runInThisContext } from 'vm';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  // currentSystem: any;
  private currentSystemSubject: BehaviorSubject<any>;
  public currentSystem: Observable<any>;
  @Output() changeSystem: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.currentSystemSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentSystem')));
    this.currentSystem = this.currentSystemSubject.asObservable();
  }

  public getCurrentSystem() {
    return this.currentSystemSubject.value;
  }

  getSystems(): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'get_systems/', {}).pipe(
      map(system => system.data),
      tap(systems => {
        this.changeSystem.emit(systems);
      })
      // tap(system => {
      //   if (localStorage.getItem('currentSystem') === null || localStorage.getItem('currentSystem') === 'undefined') {
      //     this.currentSystem = system[0];
      //     console.log('Saving new current system ... ');
      //     localStorage.setItem('currentSystem', JSON.stringify(this.currentSystem));
      //   }
      // })
    );
  }

  createSystem(system: any): Observable<any> {
    const createSystemUrl = environment.apiEndpoint + 'create_system/';
    return this.http.post<any>(createSystemUrl, system).pipe(
      tap(system => console.log(system)),
    );
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
    return this.http.post<any>(environment.apiEndpoint + 'get_system/', {system_id: systemId}).pipe(
      map(system => system.data),
      tap(system => {
        localStorage.setItem('currentSystem', JSON.stringify(system)),
        this.currentSystemSubject.next(system);
        window.location.reload();
      })
    );
  }

  updateSystem(system: any) {
    return this.http.post<any>(environment.apiEndpoint + 'update_system/', system).pipe(
      map(result => result),
      tap(result => {
        console.log(result);
        const currentSystem = result[0];
        // console.log(currentSystem);
        // this.changeSystem.emit(result.data);
      }));
  }

  checkCurrentSystem() {
    if (localStorage.getItem('currentSystem') === null || localStorage.getItem('currentSystem') === 'undefined') {
      // console.log('Not set');
      return false;
    } else {
      console.log('Saved system');
      const system = JSON.parse(localStorage.getItem('currentSystem'));
      console.log(system ? 'true' : 'false');
      return system;
    }
  }

  setSystem() {
    return this.http.post<any>(environment.apiEndpoint + 'get_systems/', {
    }).pipe(
      map(response => response.data[0]),
      tap(system => {
        console.log(system);
        localStorage.setItem('currentSystem', JSON.stringify(system));
        this.currentSystemSubject.next(system);
      }));
  }
}
