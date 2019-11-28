import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../auth/authentication.service';
import { SystemService } from '../system.service';
import { LoaderService } from '../loader.service';
import { SystemsResponse } from '../models/system';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  apiEndpoint = environment.apiEndpoint;
  clientId = environment.clientId;
  accessToken: string;
  currentSystem: any;
  currentSystemId: any;
  systemName: any;
  currentUser: any;

  constructor(
    private authService: AuthenticationService,
    private systemService: SystemService,
    private loaderService: LoaderService,
    private http: HttpClient
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.authService.currentUser.subscribe((user) => this.currentUser = user);
    if (this.currentUser) {
      this.accessToken = this.currentUser.token;
    }
    if ( request.body !== null && request.body.hasOwnProperty('system_id')) {
      request = request.clone({
        body: {...request.body, client_id: this.clientId, token: this.accessToken}
      });
    } else {
      request = request.clone({
        body: {...request.body, client_id: this.clientId, token: this.accessToken , system_id: this.currentSystem.id}
      });
      // this.authService.verifyToken(this.accessToken);
    }

    if (request.method === 'GET') {
      let currentParams = request.params;
      currentParams = currentParams.append('client_id', this.clientId);
      currentParams = currentParams.append('token', this.accessToken);
      currentParams = currentParams.append('system_id', this.currentSystem.id);

      request = request.clone({
        params: currentParams
      });
      // console.log(request);
    }
    // console.log(request);

    return next.handle(request).pipe(
      finalize(() => {this.loaderService.hide()})
    );
  }
}
