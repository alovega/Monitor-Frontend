import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  apiEndpoint = environment.apiEndpoint;
  clientId = environment.clientId;
  accessToken: string;

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted');
    this.accessToken = JSON.parse(localStorage.getItem('accessToken'));

    if (!this.accessToken) {
      this.accessToken = environment.accessToken;
    }

    request = request.clone({
        body: {...request.body, client_id: this.clientId, token: this.accessToken}
    });

    return next.handle(request);
  }
}
