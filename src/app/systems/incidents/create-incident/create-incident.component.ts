import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Incident } from '../incident';
import { IncidentService } from '../incident.service';
import Swal from 'sweetalert2';

import { AbstractControl, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from 'src/app/shared/system.service';
import { LookUpService } from 'src/app/shared/look-up.service';

@Component({
  selector: 'hm-create-incident',
  templateUrl: './create-incident.component.html',
  styleUrls: ['./create-incident.component.scss']
})
export class CreateIncidentComponent implements OnInit {
  realtimeIncidentForm: FormGroup;
  scheduledMaintenanceForm: FormGroup;
  submitted = false;
  datePicker: any;
  timePicker: any;
  realtimeUrl: string;
  maintenanceUrl: string;
  systemId: string;
  currentSystem: any;
  incident: Incident;
  users: any;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private incidentService: IncidentService,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private lookupService: LookUpService
    ) {
      this.incident = new Incident();
   }

  ngOnInit() {
    this.lookupService.getUsers().subscribe(
      (users) => this.users = users
    );
    this.currentSystem = this.systemService.getCurrentSystem();
    this.systemId = this.currentSystem.id;
    this.realtimeUrl = `/system/incidents/new/realtime`;
    this.maintenanceUrl = `/system/incidents/new/maintenance`;
    this.createRealtimeIncidentForm();
    this.createScheduledMaintenanceForm();
  }

  createRealtimeIncidentForm() {
    this.realtimeIncidentForm = this.formBuilder.group ({
      incidentName: ['', Validators.required],
      incidentStatus: ['Investigating', Validators.required],
      message: ['', Validators.required],
      escalationLevel: ['High', Validators.required],
      priorityLevel: ['1', Validators.required],
      user: ['']
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


  createScheduledMaintenanceForm() {
    this.scheduledMaintenanceForm = this.formBuilder.group ({
      maintenanceName: ['', Validators.required],
      maintenanceStatus: ['Scheduled', Validators.required],
      startDate: [this.datePicker, Validators.required],
      endDate: [this.datePicker, Validators.required],
      startTime: [this.timePicker, Validators.required],
      endTime: [this.timePicker, Validators.required],
      message: ['', Validators.required],
      escalationLevel: ['High', Validators.required],
      priorityLevel: ['1', Validators.required]
    });
  }

  onSubmitRealtime() {
    this.submitted = true;
    if (this.realtimeIncidentForm.invalid) {
      console.log('Invalid');
      return;
    }

    this.incident.incident_type = 'Realtime';
    console.log(this.incident);
    return this.incidentService.createIncident(this.incident).subscribe(
      ((result: any) => {
        if (result.code === '800.200.001') {
          Swal.fire({
            title: 'Success',
            text: 'Realtime incident created successfully!',
            type: 'success',
          }).then(() => {
          this.router.navigate(['system/incidents']);
          });
        }
      })
    );
  }

  public back(): void {
    this.router.navigate(['system/incidents']);
  }

  onSubmitScheduled() {
    this.submitted = true;
    if (this.scheduledMaintenanceForm.invalid) {
      console.log('Invalid');
      return;
    }

    let scheduledFor = new Date(
      this.scheduledMaintenanceForm.controls.startDate.value.year,
      this.scheduledMaintenanceForm.controls.startDate.value.month - 1,
      this.scheduledMaintenanceForm.controls.startDate.value.day,
      this.scheduledMaintenanceForm.controls.startTime.value.hour,
      this.scheduledMaintenanceForm.controls.startTime.value.minute
    ).toISOString();

    let scheduledUntil = new Date(
      this.scheduledMaintenanceForm.controls.endDate.value.year,
      this.scheduledMaintenanceForm.controls.endDate.value.month - 1,
      this.scheduledMaintenanceForm.controls.endDate.value.day,
      this.scheduledMaintenanceForm.controls.endTime.value.hour,
      this.scheduledMaintenanceForm.controls.endTime.value.minute
    ).toISOString();
    // console.log(scheduledFor);
    // console.log(scheduledUntil);

    this.incident.incident_type = 'Scheduled';
    this.incident.scheduled_for = scheduledFor;
    this.incident.scheduled_until = scheduledUntil;
    console.log(this.incident);
    return this.incidentService.createIncident(this.incident).subscribe(
      ((result: any) => {
        if (result.code === '800.200.001') {
          Swal.fire({
            title: 'Success',
            text: 'Scheduled incident created successfully!',
            type: 'success',
          }).then(() => {
            this.location.back();
          });
        }
      })
    );
  }
}
