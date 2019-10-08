import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from './endpoint';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  endpointUrl = 'assets/demo-endpoints.json';

constructor(private http: HttpClient) { }

  public getEndpoints(): Observable<Endpoint[]> {
    return this.http.get<Endpoint[]>(this.endpointUrl);
  }
}
