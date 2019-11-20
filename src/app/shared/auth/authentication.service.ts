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
      const userData = localStorage.getItem('currentUser');
      // return userData;
      if (userData) {
          const user = JSON.parse(userData);
          if (user.token && (new Date(Number(user.expires_at) * 1000)) > new Date()) {
            this.verifyToken(user.token);
            return true;
          } else {
            return false;
          }
      } else {
        return false;
      }
  }

  public verifyToken(token: any) {
    return this.http.post<any>(`${environment.apiEndpoint}verify_token/`, {token: token}).pipe(
      map(result => {
        console.log('User token');
        console.log(result);
        if (result.code === '800.200.001') {
          localStorage.setItem('currentUser', JSON.stringify(result.data));
          this.currentUserSubject.next(result.data);
          return result.data;
        } else {
          this.logout();
        }
      })
    );
  }

  login(username, password) {
    return this.http.post<any>(`${environment.apiEndpoint}get_access_token/`, {username, password}).pipe(
      map(result => {
        if (result.code === '800.200.001') {
          localStorage.setItem('currentUser', JSON.stringify(result.data));
          this.currentUserSubject.next(result.data);
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
