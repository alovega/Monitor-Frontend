import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap} from 'rxjs/operators';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

constructor(private http: HttpClient) { }

  getLoggedInUserDetail(): Observable<any> {
    console.log(environment.accessToken)
    const getUsersUrl = environment.apiEndpoint + 'get_logged_in_user_details/';
    return this.http.post<any>(getUsersUrl, {token:environment.accessToken}).pipe(
      map(data => data.data)
    );
}

}

