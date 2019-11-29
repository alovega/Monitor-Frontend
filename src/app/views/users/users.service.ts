import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpWrapper: HttpWrapperService,
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
