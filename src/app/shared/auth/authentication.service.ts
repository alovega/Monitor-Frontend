import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiEndpoint = environment.apiEndpoint;
  clientId = environment.clientId;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
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

  login(username, password) {
    return this.http.post<any>(`${environment.apiEndpoint}get_access_token/`, {username, password}).pipe(
      map(result => {
        if (result.code === '800.200.001') {
          localStorage.setItem('currentUser', JSON.stringify(result.data));
          environment.accessToken = result.data.token;
          this.currentUserSubject.next(result.data);
          let body = document.getElementsByTagName('body')[0];
          if (this.currentUser) {
            body.classList.remove('body-logged-out');
          } else {
            body.classList.add('body-logged-out');
          }
          return result.data;
        } else {
          return null;
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
