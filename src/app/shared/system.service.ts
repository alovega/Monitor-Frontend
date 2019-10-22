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
  token = 'MmVmZWQzYTdhNGY2ZjMxNTE4NGQ1ZWZlOTk5MDA3';
  clientId = '3cd49364-721a-4d3f-8bfa-141d93d6a8f7';

  constructor(private http: HttpClient) { }

  getSystems(): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/get_systems/', {
      client_id: this.clientId,
      token: this.token,
    }).pipe(
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
    return this.http.post<any>('http://127.0.0.1:8000/api/get_systems/', {
      client_id: this.clientId,
      token: this.token,
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
