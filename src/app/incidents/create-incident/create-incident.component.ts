import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(`Your form data : ${JSON.stringify(this.scheduledMaintenanceForm.value)}`);
    console.log(this.scheduledMaintenanceForm.controls.startTime.value.hour);
    // console.log(this.scheduledMaintenanceForm.controls.startDate.errors);
    this.submitted = true;
  }

}
