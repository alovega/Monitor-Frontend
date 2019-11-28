import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Incident, IncidentsResponse } from '../incident';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../shared/system.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'hm-open-incidents',
  templateUrl: './open-incidents.component.html',
  styleUrls: ['./open-incidents.component.scss']
})

export class OpenIncidentsComponent implements OnInit {
  incidents: Incident[];
  currentSystem: any;
  loading = true;

  constructor(
    private systemService: SystemService,
    private incidentService: IncidentService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.showIncidents();
  }
  showIncidents() {
    const options = {
      states: ['Investigating', 'Identified', 'Monitoring', 'Scheduled', 'InProgress'],
    };
    this.incidentService.getIncidents<IncidentsResponse>(options)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.incidents = response.body.data;
        } else {
          this.toastr.error('Could not retrieve open incidents', 'Error');
        }
        this.loading = false;
      } else {
        // TODO: Add error checks
      }
    });
  }

}
