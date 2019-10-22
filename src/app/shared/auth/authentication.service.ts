import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiEndpoint = environment.apiEndpoint;
  clientId = environment.clientId;

  constructor(
    private http: HttpClient
  ) {
  }

  public isAuthenticated() {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          return this.isTokenExpired(user.token, user.expiresAt);
      }
  }

  public isTokenExpired(token, expiresIn) {
    if ( token && expiresIn ) {
        const now = new Date();
        return new Date(now.getTime() + Number(expiresIn) * 1000) > now;
    }
  }

  public login() {

  }

  public logout() {
      
  }
}
