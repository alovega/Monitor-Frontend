import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap, filter} from 'rxjs/operators';
// import { runInThisContext } from 'vm';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  currentSystem: any;
  @Output() changeSystem: EventEmitter<boolean> = new EventEmitter();
  constructor(private http: HttpClient) { }

  getSystems(): Observable<any> {
    console.log('Called');
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


  setSystem(systemId: string) {
    const getSystemUrl = environment.apiEndpoint + 'get_systems/';
    return this.http.post<any>(getSystemUrl, {}).pipe(
      map(systems => systems.data.filter(system => system.id === systemId)),
      tap(systems => {
        localStorage.setItem('currentSystem', JSON.stringify(systems[0])),
        this.changeSystem.emit(systems);
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

  getCurrentSystem() {
    // console.log(localStorage.getItem('currentSystem'));
    return this.http.post<any>(environment.apiEndpoint + 'get_systems/', {
    }).pipe(
      map(result => result.data),
      tap(result => {
        const currentSystem = result[0];
        localStorage.setItem('currentSystem', JSON.stringify(currentSystem));
        // console.log(currentSystem);
        // this.changeSystem.emit(result.data);
      }));
  }
}
