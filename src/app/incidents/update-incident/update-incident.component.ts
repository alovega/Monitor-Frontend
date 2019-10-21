import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IncidentService } from '../incident.service';
import { Incident } from '../incident';

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
  initialPriorityLevel: string;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    this.id = this.route.snapshot.paramMap.get('incident-id');
  }

  ngOnInit() {
    this.showIncident();
    this.createUpdateIncidentForm();
  }

  createUpdateIncidentForm() {
    this.updateIncidentForm = this.formBuilder.group({
      incidentStatus: ['Investigating', Validators.required],
      message: ['', Validators.required],
      priorityLevel: ['', Validators.required]
    });
  }

  // public showIncident(): void {
  //   const id = this.route.snapshot.paramMap.get('incident-id');
  //   this.incidentService.getIncident(id)
  //     .subscribe((data: Incident[]) => {
  //       this.incidents = data.filter(incident => incident.incident_id === id);
  //       // console.log(this.incidents);
  //       this.incident = this.incidents[0];
  //     });
  // }

  public showIncident(): void {
    this.incidentService.getIncident(this.id).subscribe(
      (data: Incident) => {
        this.incident = data;
        this.updateIncidentForm.patchValue({
          priorityLevel: this.incident.priority_level.toString(),
          incidentStatus: this.incident.status.toString(),
        });
        // this.initialPriorityLevel = this.incident.priority_level.toString();
        console.log(this.incident.priority_level.toString());
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.updateIncidentForm.value);

    if (this.updateIncidentForm.invalid) {
      console.log('Invalid');
      return ;
    }

    let formData: any = new FormData();
    formData.append('name', this.incident.name);
    formData.append('state', this.updateIncidentForm.get('incidentStatus').value);
    formData.append('description', this.updateIncidentForm.get('message').value);
    formData.append('escalation_level', 'High');
    formData.append('priority_level', this.updateIncidentForm.get('priorityLevel').value);
    formData.append('incident_id', this.incident.incident_id);
    // formData.append('system', this.incident.currentSystem);

    for (let key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    return this.incidentService.updateIncident(formData).subscribe(
      (incident => {
        if (incident.code === '800.200.001') {
          this.location.back();
        }
      })
    );
  }
}
