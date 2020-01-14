import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Incident, IncidentResponse } from '../incident';
import { IncidentService } from '../incident.service';
import { Select2OptionData } from 'ng-select2';
import Swal from 'sweetalert2';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from 'src/app/shared/system.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { ToastrService } from 'ngx-toastr';
import { DropdownItem } from 'src/app/layout/top-nav-bar/dropdown-item';
import { System } from 'src/app/shared/models/system';
import { LookupData, LookupDataResponse } from 'src/app/shared/models/lookup-data';
import { State } from 'src/app/shared/models/state';
import { EscalationLevel } from 'src/app/shared/models/escalation-level';
// import { EndpointService } from '../../endpoint/endpoint.service';

@Component({
  selector: 'hm-create-incident',
  templateUrl: './create-incident.component.html',
  styleUrls: ['./create-incident.component.scss']
})
export class CreateIncidentComponent implements OnInit {
  realtimeIncidentForm: FormGroup;
  scheduledMaintenanceForm: FormGroup;
  affectedEndpoints: FormGroup;
  submitted = false;
  realtimeUrl: string;
  maintenanceUrl: string;
  currentSystem: System;
  incident: Incident;
  priorityLevels: Select2OptionData[];
  escalationLevels: Select2OptionData[];
  realtimeStatuses: Select2OptionData[];
  scheduledStates: Select2OptionData[];
  constructor(
    public router: Router,
    private location: Location,
    private incidentService: IncidentService,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private lookupService: LookUpService,
    private toastr: ToastrService
    ) {
      this.incident = new Incident();
      this.realtimeIncidentForm = this.formBuilder.group ({
        name: ['', Validators.required],
        state: ['Investigating', Validators.required],
        description: ['', Validators.required],
        escalation_level: ['', Validators.required],
        priority_level: ['', Validators.required],
        user: ['']
      });

      this.scheduledMaintenanceForm = this.formBuilder.group ({
        name: ['', Validators.required],
        state: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        description: ['', Validators.required],
        escalation_level: ['', Validators.required],
        priority_level: ['', Validators.required],
        scheduled_for: [''],
        scheduled_until: [''],
      });
   }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.realtimeUrl = '/dashboard/incidents/new/realtime';
    this.maintenanceUrl = '/dashboard/incidents/new/maintenance';
    this.priorityLevels = [
      {id: '1', text: 'Priority 1'},
      {id: '2', text: 'Priority 2'},
      {id: '3', text: 'Priority 3'},
      {id: '4', text: 'Priority 4'},
      {id: '5', text: 'Priority 5'}
    ];
    this.lookupService.getLookups<LookupDataResponse>()
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          const lookupData: LookupData = response.body.data;
          this.escalationLevels = lookupData.escalation_levels.map((i: EscalationLevel) => ({id: i.id, text: i.name}));
          this.realtimeStatuses = lookupData.realtime_incident_states.map((i: State) => ({id: i.id, text: i.name}));
          this.scheduledStates = lookupData.scheduled_incident_states.map((i: State) => ({id: i.id, text: i.name}));
        } else {}
      } else {
        // TODO: Add error handling
      }
    });
  }

  // checkStartTime(control: AbstractControl) {
  //   let hour = 10;
  //   let minute = 15;
  //   return null;
  //   if (control.value && control.value.length > 0){
  //     let start_date = new Date(control.value.year, control.value.month-1, control.value.day, hour, minute);
  //     let currentDateTime = new Date();
  //     if(start_date > currentDateTime){
  //       return {validStartDate: true };
  //     }
  //     return {validStartDate: null};
  //   }
  //   return {validStartDate: true };
  // }

  onSubmitRealtime() {
    this.submitted = true;
    if (this.realtimeIncidentForm.invalid) {
      return;
    }
    return this.incidentService.createIncident<IncidentResponse>('Realtime', this.realtimeIncidentForm.value)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.toastr.success('Incident created successfully', 'Incident creation success');
          this.location.back();
        } else {
          this.toastr.error('Incident creation failed', 'Incident creation error');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }

  public back(): void {
    this.router.navigate(['dashboard/incidents']);
  }

  get maintenanceForm() {
    return this.scheduledMaintenanceForm.controls;
  }

  onSubmitScheduled() {
    this.submitted = true;
    if (this.scheduledMaintenanceForm.invalid) {
      return;
    }
    this.scheduledMaintenanceForm.patchValue({
      scheduled_for: new Date(
        this.maintenanceForm.startDate.value.year,
        this.maintenanceForm.startDate.value.month - 1,
        this.maintenanceForm.startDate.value.day,
        this.maintenanceForm.startTime.value.hour,
        this.maintenanceForm.startTime.value.minute
      ).toISOString(),
      scheduled_until: new Date(
        this.maintenanceForm.endDate.value.year,
        this.maintenanceForm.endDate.value.month - 1,
        this.maintenanceForm.endDate.value.day,
        this.maintenanceForm.endTime.value.hour,
        this.maintenanceForm.endTime.value.minute
      ).toISOString()
    });

    return this.incidentService.createIncident<IncidentResponse>('Scheduled', this.scheduledMaintenanceForm.value)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.toastr.success('Maintenance created successfully', 'Maintenance creation success');
          this.location.back();
        } else {
          this.toastr.error('Maintenance creation failed', 'Maintenance creation error');
        }
      } else {
        // TODO: Add error checks
      }
      });
  }
}
