import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap} from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  deleteRuleUrl = 'http://127.0.0.1:8000/api/get_rules/';

  public users: any[] = [];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + 'create_user/', user).pipe(
      tap(response => console.log(response))
    );
  }

  getUsers(): Observable<any> {
    const getUsersUrl = environment.apiEndpoint + 'get_users/';
    return this.http.post<any>(getUsersUrl, {}).pipe();
  }

  getUser(userId: string) {
    const getUserUrl = 'http://127.0.0.1:8000/api/get_user/';
    return this.http.post<any[]>(getUserUrl, {user_id: userId}, this.httpOptions).pipe();
  }

  updateUser(formData: any) {
    const updateUserUrl = 'http://127.0.0.1:8000/api/update_user/';
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
