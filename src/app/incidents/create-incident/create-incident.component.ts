import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {  FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'hm-create-incident',
  templateUrl: './create-incident.component.html',
  styleUrls: ['./create-incident.component.scss']
})
export class CreateIncidentComponent implements OnInit {
  realtimeIncidentForm = new FormGroup ({
    incidentName: new FormControl(''),
    incidentStatus: new FormControl('Investigating'),
    message: new FormControl('')
  });
  scheduledMaintenanceForm = new FormGroup ({
    maintenanceName: new FormControl(''),
    maintenanceStatus: new FormControl('Scheduled'),
    message: new FormControl('')
  });
  date  =  new  FormControl(new  Date());
  time = {hour: 13, minute: 30};
  model;
  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  }

}
