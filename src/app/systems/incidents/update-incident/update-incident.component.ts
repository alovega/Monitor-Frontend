import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IncidentService } from '../incident.service';
import { Incident } from '../incident';
import { SystemService } from 'src/app/shared/system.service';

@Component({
  selector: 'hm-update-incident',
  templateUrl: './update-incident.component.html',
  styleUrls: ['./update-incident.component.scss']
})
export class UpdateIncidentComponent implements OnInit {
  updateIncidentForm: FormGroup;
  submitted = false;
  incidents: Incident[];
  incident: any;
  initialPriorityLevel: string;
  incidentId: string;
  systemId: string;
  currentSystem: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private incidentService: IncidentService,
    private formBuilder: FormBuilder,
    private location: Location,
    private systemService: SystemService
  ) {
    this.incidentId = this.activatedRoute.snapshot.paramMap.get('incident-id');
  }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.systemId = param['system-id'];
        console.log(this.systemId);
      });

    let issetCurrentSystem = this.systemService.checkCurrentSystem();
    issetCurrentSystem ? this.systemService.getCurrentSystem()
    .subscribe(systems => this.currentSystem = systems[0]) : this.currentSystem  = this.systemService.checkCurrentSystem();
    console.log(this.currentSystem);

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
    console.log('Showing...');
    this.incidentService.getIncident(this.incidentId, this.currentSystem).subscribe(
      (data: any) => {
        this.incident = data;
        console.log('Incident data is' + data);
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

    for (let key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    return this.incidentService.updateIncident(formData, this.currentSystem).subscribe(
      (incident => {
        if (incident.code === '800.200.001') {
          this.location.back();
        }
      })
    );
  }
}
