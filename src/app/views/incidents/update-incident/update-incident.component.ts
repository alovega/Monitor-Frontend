import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { IncidentService } from '../incident.service';
import { Incident, IncidentResponse } from '../incident';
import { SystemService } from 'src/app/shared/system.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { ToastrService } from 'ngx-toastr';
import { DropdownItem } from 'src/app/layout/top-nav-bar/dropdown-item';

@Component({
  selector: 'hm-update-incident',
  templateUrl: './update-incident.component.html',
  styleUrls: ['./update-incident.component.scss']
})

export class UpdateIncidentComponent implements OnInit {
  updateIncidentForm: FormGroup;
  submitted = false;
  incidents: Incident[];
  incident: Incident;
  incidentState: string;
  realtimeStates: DropdownItem[];
  scheduledStates: DropdownItem[];
  initialPriorityLevel: string;
  incidentId: string;
  systemId: string;
  currentSystem: any;
  users: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private incidentService: IncidentService,
    private formBuilder: FormBuilder,
    private location: Location,
    private systemService: SystemService,
    private router: Router,
    private lookupService: LookUpService,
    private toastr: ToastrService
  ) {
    this.incidentId = this.activatedRoute.snapshot.paramMap.get('incident-id');
  }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.systemId = this.currentSystem.id;
    if (this.currentSystem) {
      this.showIncident();
    }
    this.lookupService.getRealtimeIncidentStates().subscribe(
      (realtimeStates) => this.realtimeStates = realtimeStates
    );
    this.lookupService.getRealtimeIncidentStates().subscribe(
      (scheduledStates) => this.scheduledStates = scheduledStates
    );
    this.showIncident();
  }

  public showIncident(): void {
    // console.log('Showing...' + this.currentSystem);
    this.incidentService.getIncident<IncidentResponse>(this.incidentId)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.incident = response.body.data;
        } else {
          this.toastr.error('Could not fetch the incident history. Try again later', 'Error!');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }

  back() {
    this.router.navigate(['dashboard/incidents']);
  }
}
