import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {  FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'hm-create-incident',
  templateUrl: './create-incident.component.html',
  styleUrls: ['./create-incident.component.scss']
})
export class CreateIncidentComponent implements OnInit {
  realtimeIncidentForm: FormGroup;
  scheduledMaintenanceForm: FormGroup;
  submitted: boolean = false;
  datePicker: any;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder) {
    this.createRealtimeIncidentForm();
    this.createScheduledMaintenanceForm();
   }

  ngOnInit() {
  }

  createRealtimeIncidentForm() {
    this.realtimeIncidentForm = this.formBuilder.group ({
      incidentName: ['', Validators.required],
      incidentStatus: ['Investigating', Validators.required],
      message: ['', Validators.required]
    });
  }

  createScheduledMaintenanceForm() {
    this.scheduledMaintenanceForm = this.formBuilder.group ({
      maintenanceName: ['', Validators.required],
      maintenanceStatus: ['Scheduled', Validators.required],
      startDate: [this.datePicker, Validators.required],
      endDate: [this.datePicker, Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(`Your form data : ${JSON.stringify(this.scheduledMaintenanceForm.value)}`);
    // console.log(this.scheduledMaintenanceForm.controls.date.errors.required);
    this.submitted = true;
  }

}
