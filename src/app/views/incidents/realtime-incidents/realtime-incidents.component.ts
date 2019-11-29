import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Incident, IncidentsResponse } from '../incident';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../shared/system.service';
import { ToastrService } from 'ngx-toastr';
import { System } from 'src/app/shared/models/system';

@Component({
  selector: 'hm-realtime-incidents',
  templateUrl: './realtime-incidents.component.html',
  styleUrls: ['./realtime-incidents.component.scss']
})
export class RealtimeIncidentsComponent implements OnInit {
  incidents: Incident[];
  currentSystem: System;
  loading = true;

  constructor(
    private incidentService: IncidentService,
    private toastr: ToastrService,
    private systemService: SystemService
  ) { }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.showRealtimeIncidents();
  }

  public showRealtimeIncidents() {
    const options = {
      incident_type: 'Realtime',
    };
    return this.incidentService.getIncidents<IncidentsResponse>(options)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.incidents = response.body.data;
        } else {
          this.toastr.error('Could not fetch realtime incidents', 'Get incidents error');
        }
        this.loading = false;
      } else {
        // TODO: Add error checks
      }
    });
  }
}
