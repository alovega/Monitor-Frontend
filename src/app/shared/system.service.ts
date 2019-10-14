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
  token = 'ZWQ3NjNhZTgwMjZjYTFkZDg3MDEwM2I2ODY0MjMy';
  clientId = '3cd49364-721a-4d3f-8bfa-141d93d6a8f7';

  constructor(private http: HttpClient) { }

  getSystems(): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/get_systems/', {
      client_id: this.clientId,
      token: this.token,
    }).pipe(
      map(system => system.data),
      tap(system => {
        if (localStorage.getItem('currentSystem') === null) {
          this.currentSystem = system[0];
          localStorage.setItem('currentSystem', JSON.stringify(this.currentSystem));
        }
      })
    );
  }

  createSystem(formData: any): Observable<any> {
    formData.append('system', 'Helaplan');
    formData.append('client_id', this.clientId);
    formData.append('token', this.token);

    return this.http.post<any>('http://127.0.0.1:8000/api/get_systems', formData).pipe(
      // tap(system => console.log(system))
    );
  }


  setSystem(systemId: string) {
    return this.http.post<any>('http://127.0.0.1:8000/api/get_systems/', {
      client_id: this.clientId,
      token: this.token,
    }).pipe(
      map(systems => systems.data.filter(system => system.id === systemId)),
      tap(systems => {
        localStorage.setItem('currentSystem', JSON.stringify(systems[0])),
        this.changeSystem.emit(systems);
      })
    );
  }

  getCurrentSystem() {
    // console.log(localStorage.getItem('currentSystem'));
    if (localStorage.getItem('currentSystem') === null || localStorage.getItem('currentSystem') === undefined) {
      this.getSystems();
    }
    return JSON.parse(localStorage.getItem('currentSystem'));
  }
}
