import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, retry} from 'rxjs/operators';
import { System } from './models/system';
import { EscalationLevel } from './models/escalation-level';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  systemUrl = 'http://localhost:8000/systems';
  levelUrl = 'http://localhost:8000/levels'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

constructor(private http: HttpClient) { }

// Handle API errors
handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};

public getSystems(): Observable<System> {

  return this.http.get<System>(this.systemUrl).pipe(
    retry(2),
    catchError(this.handleError)
  );
}

public getEscalationLevels(): Observable<EscalationLevel> {

  return this.http.get<EscalationLevel>(this.levelUrl).pipe(
    retry(2),
    catchError(this.handleError)
  );
}

}
