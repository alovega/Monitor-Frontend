import { Injectable } from '@angular/core';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusPageService {

  constructor(
    private httpWrapper: HttpWrapperService,
  ) { }

  getAvailabilitySummary<T>(systemId: string, activeTab: string): Observable<HttpResponse<T>> {
    return this.httpWrapper.post<T>('get_availability_summary/', {
      system_id: systemId,
      interval: activeTab
    });
  }
}
