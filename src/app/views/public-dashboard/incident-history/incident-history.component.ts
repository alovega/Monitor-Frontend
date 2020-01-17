import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentHistoryService } from './incident-history.service';
import { IncidentResponse, Incident } from '../../incidents/incident';
import { SystemStatusService } from 'src/app/shared/system-status.service';
import { StatusPageService } from '../status-page.service';
import { Location } from '@angular/common';

@Component({
  selector: 'hm-incident-history',
  templateUrl: './incident-history.component.html',
  styleUrls: ['./incident-history.component.scss']
})
export class IncidentHistoryComponent implements OnInit {
  incidentId: string;
  incident: Incident;
  systemStatus: any;
  constructor(
    private incidentHistoryService: IncidentHistoryService,
    private activatedRoute: ActivatedRoute,
    private statusPageService: StatusPageService,
    private location: Location
  ) {}

  ngOnInit() {
    this.incidentId = this.activatedRoute.snapshot.paramMap.get('incident-id');
    this.statusPageService.currentSystem.subscribe(
      (response) => {
        this.systemStatus = response;
        console.log(response);
      });
    this.incidentHistoryService.getIncident<IncidentResponse>(this.incidentId)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.incident = response.body.data;
        } else {

        }
      } else {
        // TODO Add error checks
      }
    });
  }

  back() {
    this.location.back();
  }
}
