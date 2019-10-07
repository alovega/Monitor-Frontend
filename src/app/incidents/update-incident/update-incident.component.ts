import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'hm-update-incident',
  templateUrl: './update-incident.component.html',
  styleUrls: ['./update-incident.component.scss']
})
export class UpdateIncidentComponent implements OnInit {
  updateIncidentForm = new FormGroup ({
    incidentStatus: new FormControl('Investigating'),
    message: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

}
