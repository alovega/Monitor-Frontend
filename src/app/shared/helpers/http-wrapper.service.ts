import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, retry, catchError} from 'rxjs/operators';
import { AuthenticationService } from '../auth/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthenticationService) { }

  post(url: string, body: any = {}, headers?: any) {
    return this.request(url, 'POST', body, headers);
  }

  get(url: string) {
    return this.request(url, 'GET');
  }

  private request(url: string, method: string, body?: any, headers?: any): Observable<any> {
    console.log(body);
    const targetUrl = environment.apiEndpoint + url;
    const options = {
      body, headers
    };
    return this.http.request(method, targetUrl, options).pipe(
        map((response: any) => {
          if (response.code === '800.200.001') {
            console.log(response);
            return response.data;
          } else {
            console.log(response);
          }
        }),
        catchError(this.handleError.bind(this)),
    );
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message);
    } else if (error.status === 401) {
      this.authService.logout();
    }
    return throwError('Something bad happened; please try again later.');
  }
}
