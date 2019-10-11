import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentService,
    private formBuilder: FormBuilder
  ) { }

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
    const id = this.route.snapshot.paramMap.get('incident-id');
    this.incidentService.getIncident(id).subscribe(
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

    // let formData: any = new FormData();
    // formData.append('name', this.realtimeIncidentForm.get('incidentName').value);
    // formData.append('state', this.realtimeIncidentForm.get('incidentStatus').value);
    // formData.append('description', this.realtimeIncidentForm.get('message').value);
    // formData.append('escalation_level', this.realtimeIncidentForm.get('escalationLevel').value);
    // formData.append('priority_level', this.realtimeIncidentForm.get('priorityLevel').value);
    // formData.append('incident_type', 'Realtime');

  }
}
