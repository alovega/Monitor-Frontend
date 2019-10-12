import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  
  constructor(private http: HttpClient) { }

  getSystems(): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/get_systems/', {
      client_id: '3cd49364-721a-4d3f-8bfa-141d93d6a8f7',
      token: 'YTI0ZWU2YjE5Mjk1MjZjZDkzOTI4M2YzOWMwODAx',
    }).pipe(
      map(system => system.data),
      tap(system => console.log(system))
    );
  }

  createSystem(formData: any): Observable<any> {
    formData.append('system', 'Helaplan');
    formData.append('client_id', '3cd49364-721a-4d3f-8bfa-141d93d6a8f7');
    formData.append('token', 'YTI0ZWU2YjE5Mjk1MjZjZDkzOTI4M2YzOWMwODAx');

    return this.http.post<any>('http://127.0.0.1:8000/api/get_systems', formData).pipe(
      tap(system => console.log(system))
    );
  }
}
