import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map, tap, filter} from 'rxjs/operators';
// import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  currentSystem: any;
  @Output() changeSystem: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getSystems(): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/get_systems/', {
      client_id: '3cd49364-721a-4d3f-8bfa-141d93d6a8f7',
      token: 'OWM1MDU1OWE4MzI4NzFiZDE5MGIzMzNlZWE1MmM1',
    }).pipe(
      map(system => system.data),
      tap(system => {
        if (localStorage.getItem('currentSystem') === null) {
          this.currentSystem = system[0];
          console.log(this.currentSystem);
          localStorage.setItem('currentSystem', JSON.stringify(this.currentSystem));
        }
      })
    );
  }

  createSystem(formData: any): Observable<any> {
    formData.append('system', 'Helaplan');
    formData.append('client_id', '3cd49364-721a-4d3f-8bfa-141d93d6a8f7');
    formData.append('token', 'OWM1MDU1OWE4MzI4NzFiZDE5MGIzMzNlZWE1MmM1');

    return this.http.post<any>('http://127.0.0.1:8000/api/get_systems', formData).pipe(
      // tap(system => console.log(system))
    );
  }


  setSystem(systemId: string) {
    return this.http.post<any>('http://127.0.0.1:8000/api/get_systems/', {
      client_id: '3cd49364-721a-4d3f-8bfa-141d93d6a8f7',
      token: 'OWM1MDU1OWE4MzI4NzFiZDE5MGIzMzNlZWE1MmM1',
    }).pipe(
      map(systems => systems.data.filter(system => system.id === systemId)),
      tap(system => {
        localStorage.setItem('currentSystem', JSON.stringify(system)),
        this.changeSystem.emit(system)
      }),
      // tap(system => this.getCurrentSystem())
    );
  }

  getCurrentSystem() {
    if (localStorage.getItem('currentSystem') === null) {
      this.getSystems();
    }
    return JSON.parse(localStorage.getItem('currentSystem'));
  }
}
