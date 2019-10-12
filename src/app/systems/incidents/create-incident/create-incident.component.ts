import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Incident } from '../incident';
import { IncidentService } from '../incident.service';

import { AbstractControl, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private incidentService: IncidentService,
    private formBuilder: FormBuilder) {
   }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        let systemId = param['system-id'];
        this.realtimeUrl = `/system/${systemId}/incidents/new/realtime`;
        this.maintenanceUrl = `/system/${systemId}/incidents/new/maintenance`;
      });
    this.createRealtimeIncidentForm();
    this.createScheduledMaintenanceForm();
  }

  createRealtimeIncidentForm() {
    this.realtimeIncidentForm = this.formBuilder.group ({
      incidentName: ['', Validators.required],
      incidentStatus: ['Investigating', Validators.required],
      message: ['', Validators.required],
      escalationLevel: ['High', Validators.required],
      priorityLevel: ['1', Validators.required]
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

    let formData: any = new FormData();
    formData.append('name', this.realtimeIncidentForm.get('incidentName').value);
    formData.append('state', this.realtimeIncidentForm.get('incidentStatus').value);
    formData.append('description', this.realtimeIncidentForm.get('message').value);
    formData.append('escalation_level', this.realtimeIncidentForm.get('escalationLevel').value);
    formData.append('priority_level', this.realtimeIncidentForm.get('priorityLevel').value);
    formData.append('incident_type', 'Realtime');

    for (let key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    return this.incidentService.createIncident(formData).subscribe(
      ((result: any) => {
        if (result.code === '800.200.001') {
          this.location.back();
        }
      })
    );
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

    let formData: any = new FormData();
    formData.append('name', this.scheduledMaintenanceForm.get('maintenanceName').value);
    formData.append('state', this.scheduledMaintenanceForm.get('maintenanceStatus').value);
    formData.append('description', this.scheduledMaintenanceForm.get('message').value);
    formData.append('scheduled_for', scheduledFor);
    formData.append('scheduled_until', scheduledUntil);
    formData.append('escalation_level', this.scheduledMaintenanceForm.get('escalationLevel').value);
    formData.append('priority_level', this.scheduledMaintenanceForm.get('priorityLevel').value);
    formData.append('incident_type', 'Scheduled');

    return this.incidentService.createIncident(formData).subscribe(
      ((result: any) => {
        if (result.code === '800.200.001') {
          this.location.back();
        }
      })
    );
  }
}
