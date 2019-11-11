import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap} from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public users: any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'create_user/', user).pipe(
      tap(response => console.log(response))
    );
  }

  getUsers(): Observable<any> {
    const getUsersUrl = environment.apiEndpoint + 'get_users/';
    return this.http.post<any>(getUsersUrl, {}).pipe(
    );
  }

  getUser(userId: string) {
    return this.http.post<any[]>(environment.apiEndpoint + 'get_user/', {
      user_id: userId
    }).pipe(
      map((res: any) => res.data)
    );
  }

  updateUser(formData: any) {
    const updateUserUrl = 'http://127.0.0.1:8000/api/edit_user/';
    return this.http.post<any[]>(updateUserUrl, formData, this.httpOptions).pipe(

    );
  }

  deleteUser(userId: any) {
    return this.http.post<any>(environment.apiEndpoint + 'delete_user/',
    {
      user_id: userId
    }).pipe(
      tap(response => console.log(response))
    );
  }
}
