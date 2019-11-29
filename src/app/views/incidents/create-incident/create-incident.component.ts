import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Incident, IncidentResponse } from '../incident';
import { IncidentService } from '../incident.service';
import Swal from 'sweetalert2';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from 'src/app/shared/system.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { ToastrService } from 'ngx-toastr';
import { DropdownItem } from 'src/app/layout/top-nav-bar/dropdown-item';
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
  datePicker: any;
  timePicker: any;
  realtimeUrl: string;
  maintenanceUrl: string;
  systemId: string;
  currentSystem: any;
  incident: Incident;
  escalationLevels: DropdownItem[];
  realtimeStatuses: DropdownItem[];
  scheduledStates: DropdownItem[];
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
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
        startDate: [this.datePicker, Validators.required],
        endDate: [this.datePicker, Validators.required],
        startTime: [this.timePicker, Validators.required],
        endTime: [this.timePicker, Validators.required],
        description: ['', Validators.required],
        escalation_level: ['', Validators.required],
        priority_level: ['', Validators.required],
        scheduled_for: [''],
        scheduled_until: [''],
      });
   }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.systemId = this.currentSystem.id;
    this.realtimeUrl = '/dashboard/incidents/new/realtime';
    this.maintenanceUrl = '/dashboard/incidents/new/maintenance';
    this.lookupService.getEscalationLevel().subscribe(
      (res) => {
        this.escalationLevels = res.map(level => ({id: level.id, text: level.name}));
      }
    );
    this.lookupService.getRealtimeIncidentStates().subscribe(
      (res) => {
        this.realtimeStatuses = res.map(level => ({id: level.id, text: level.name}));
      });
    this.lookupService.getScheduledIncidentStates().subscribe(
      (res) => {
        this.scheduledStates = res.map(level => ({id: level.id, text: level.name}));
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

  onSubmitScheduled() {
    this.submitted = true;
    if (this.scheduledMaintenanceForm.invalid) {
      return;
    }
    this.scheduledMaintenanceForm.patchValue({
      scheduled_for: new Date(
        this.scheduledMaintenanceForm.controls.startDate.value.year,
        this.scheduledMaintenanceForm.controls.startDate.value.month - 1,
        this.scheduledMaintenanceForm.controls.startDate.value.day,
        this.scheduledMaintenanceForm.controls.startTime.value.hour,
        this.scheduledMaintenanceForm.controls.startTime.value.minute
      ).toISOString(),
      scheduled_until: new Date(
        this.scheduledMaintenanceForm.controls.endDate.value.year,
        this.scheduledMaintenanceForm.controls.endDate.value.month - 1,
        this.scheduledMaintenanceForm.controls.endDate.value.day,
        this.scheduledMaintenanceForm.controls.endTime.value.hour,
        this.scheduledMaintenanceForm.controls.endTime.value.minute
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
