import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, retry, catchError} from 'rxjs/operators';
import { AuthenticationService } from '../auth/authentication.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private toastr: ToastrService) { }

  post<T>(url: string, params?: HttpParams | {[param: string]: string | string[]}, body: any = {}, headers?: HttpHeaders | {
    [header: string]: string | string[]}) {
    return this.request<T>(url, 'POST', params, body, headers);
  }

  get<T>(url: string, params?: HttpParams | {[param: string]: string | string[]}, headers?: HttpHeaders | {
    [header: string]: string | string[]}) {
      return this.request<T>(url, 'GET', params, headers);
  }

  private request<T>(url: string, method: string, params?: HttpParams | {[param: string]: string | string[]},
                     body?: any, headers?: HttpHeaders | {[header: string]: string | string[]}): Observable<HttpResponse<T> > {
    const user = localStorage.getItem('currentUser');
    let accessToken: any;
    if (user) {
      accessToken = JSON.parse(user).token;
    }
    const targetUrl = environment.apiEndpoint + url;
    if (!headers) {
      headers = new HttpHeaders();
    }
    if (!params) {
      params = new HttpParams();
    }
    const options = {
      headers,
      params: new HttpParams()
    };
    console.log(options);
    if (method === 'GET') {
      return this.http.get<T>(targetUrl, {...headers, observe: 'response', ...params});
    } else if (method === 'POST') {
      return this.http.post<T>(targetUrl, body, {...headers, observe: 'response', ...params});
    }
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.toastr.error('An error occurred. Try again later', 'Error!');
    } else if (error.status === 401) {
      this.authService.logout();
    }
    // this.toastr.error('An unexpected error occurred. Try again later.', 'Error');
    return throwError('An error; please try again later.');
  }
}
