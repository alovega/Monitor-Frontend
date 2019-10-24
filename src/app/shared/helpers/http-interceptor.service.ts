import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../auth/authentication.service';

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
    private authService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('currentSystem') !== 'undefined') {
      this.currentSystem = JSON.parse(localStorage.getItem('currentSystem'));
    }
    this.authService.currentUser.subscribe((user) => this.currentUser = user);

    if (this.currentUser) {
      this.accessToken = this.currentUser.token;
    }
    if (!this.accessToken) {
      this.accessToken = environment.accessToken;
    }

    if (this.currentSystem) {
      this.currentSystemId = this.currentSystem.id;
      this.systemName = this.currentSystem.name;
    }

    request = request.clone({
        body: {...request.body, client_id: this.clientId, token: this.accessToken , system_id: this.currentSystemId,
          system: this.systemName}
    });

    return next.handle(request);
  }
}
