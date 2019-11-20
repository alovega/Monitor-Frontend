import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpErrorResponse} from '@angular/common/http';
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
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService) { }

  post(url: string, body: any = {}, headers?: any) {
    return this.request(url, 'POST', body, headers);
  }

  get(url: string) {
    return this.request(url, 'GET');
  }

  private request(url: string, method: string, body?: any, headers?: any): Observable<any> {
    const user = localStorage.getItem('currentUser');
    let accessToken: any;
    if (user) {
      accessToken = JSON.parse(user).token;
    }
    const targetUrl = environment.apiEndpoint + url;
    const options = {
      body, headers
    };
    // console.log('Get system responds');

    return this.http.request(method, targetUrl, options).pipe(
      tap(res => console.log('Wrapper got response from ' + targetUrl)),
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError.bind(this)),
    );
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.toastr.error('An error occurred. Try again later', 'Error!');
    } else if (error.status === 401) {
      this.authService.logout();
    }
    return throwError('An error; please try again later.');
  }
}
