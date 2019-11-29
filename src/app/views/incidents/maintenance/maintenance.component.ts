import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Incident, IncidentsResponse } from '../incident';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../shared/system.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hm-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  incidents: Incident[];
  currentSystem: any;
  loading = true;

  constructor(
    private incidentService: IncidentService,
    private toastr: ToastrService,
    private systemService: SystemService
  ) {

   }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.showMaintenanceIncidents();
  }

  public showMaintenanceIncidents() {
    const options = {
      incident_type: 'Scheduled',
    };
    return this.incidentService.getIncidents<IncidentsResponse>(options)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.incidents = response.body.data;
        } else {
          this.toastr.error('Could not fetch scheduled incidents', 'Get incidents error');
        }
        this.loading = false;
      } else {
        // TODO: Add error checks
      }
    });
  }
}
