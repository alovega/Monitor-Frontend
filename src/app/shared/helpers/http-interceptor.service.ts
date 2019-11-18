import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../auth/authentication.service';
import { SystemService } from '../system.service';
import { LoaderService } from '../loader.service';

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
    private loaderService: LoaderService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.authService.currentUser.subscribe((user) => this.currentUser = user);

    if (this.currentUser) {
      this.accessToken = this.currentUser.token;
    }

    if (this.currentSystem) {
      this.currentSystemId = this.currentSystem.id;
      this.systemName = this.currentSystem.name;
    }
    this.loaderService.show();
    if ( request.body !== null && request.body.hasOwnProperty('system_id')) {
      request = request.clone({
        body: {...request.body, client_id: this.clientId, token: this.accessToken, system: this.systemName}
      });
      console.log(this.accessToken);
    } else {
      request = request.clone({
        body: {...request.body, client_id: this.clientId, token: this.accessToken , system_id: this.currentSystemId,
          system: this.systemName}
      });
      // this.authService.verifyToken(this.accessToken);
    }

    return next.handle(request).pipe(
      finalize(() => {this.loaderService.hide()})
    );
  }
}
