import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Incident } from '../incident';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../shared/system.service';


@Component({
  selector: 'hm-open-incidents',
  templateUrl: './open-incidents.component.html',
  styleUrls: ['./open-incidents.component.scss']
})

export class OpenIncidentsComponent implements OnInit {
  incidents: Incident[];
  currentSystem: any;
  currentSystemId: any;
  loading = true;

  constructor(
    private systemService: SystemService,
    private incidentService: IncidentService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;
    this.showIncidents();
  }
  showIncidents() {
    this.incidentService.getOpenIncidents(this.currentSystem).subscribe(
      (results) => {
        this.incidents = results;
        this.loading = false;
      }
    );
  }

}
