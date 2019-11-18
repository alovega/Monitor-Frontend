import { Injectable } from '@angular/core';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class SystemStatusService {

  constructor(
    private httpWrapperService: HttpWrapperService
  ) { }

  getCurrentStatus() {
    return this.httpWrapperService.post('get_system_status/');
  }

  getPastIncidents() {
    return this.httpWrapperService.post('past_incidents/');
  }

  getDashboardWidgetsData() {
    return this.httpWrapperService.post('dashboard_widgets_data/');
  }
}
