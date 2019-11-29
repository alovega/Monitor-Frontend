import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap} from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public users: any[] = [];

  constructor(
    private http: HttpClient,
    private httpWrapper: HttpWrapperService,
    private toastr: ToastrService
  ) { }

  createUser<T>(user: any): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('create_user/', user);
  }

  getUsers<T>(): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('get_users/');
  }

  getUser<T>(userId: string): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('get_user/', {user_id: userId});
  }

  updateUser<T>(userId: string, body: any): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('edit_user/', {user_id: userId, ...body});
  }

  deleteUser<T>(userId: any): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('delete_user/', {user_id: userId});
  }
}
