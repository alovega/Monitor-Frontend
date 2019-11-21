import { Injectable } from '@angular/core';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';
import { Observable } from 'rxjs';

import { SystemStatusResponse } from '../shared/models/system-status';
import { WidgetDataResponse } from '../views/dashboard/widget-data';

@Injectable({
  providedIn: 'root'
})
export class SystemStatusService {

  constructor(
    private httpWrapperService: HttpWrapperService
  ) { }

  getCurrentStatus(): Observable<SystemStatusResponse> {
    return this.httpWrapperService.post('get_system_status/');
  }

  getPastIncidents() {
    return this.httpWrapperService.post('past_incidents/');
  }

  getDashboardWidgetsData(startDate, endDate): Observable<WidgetDataResponse> {
    return this.httpWrapperService.post('dashboard_widgets_data/', {date_from: startDate, date_to: endDate});
  }
}
