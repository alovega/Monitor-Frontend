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
  incident: Incident;
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
    this.incident = new Incident();
  }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.systemId = param['system-id'];
    });

    let issetCurrentSystem = this.systemService.checkCurrentSystem();
    issetCurrentSystem ? this.currentSystem  = issetCurrentSystem : this.systemService.getCurrentSystem()
    .subscribe(systems => {
      this.currentSystem = systems[0];
      this.systemId = this.currentSystem.id;
      this.showIncident();
    });
    if (this.currentSystem) {
      this.showIncident();
    }
    // this.showIncident();
    this.createUpdateIncidentForm();
  }

  createUpdateIncidentForm() {
    this.updateIncidentForm = this.formBuilder.group({
      incidentStatus: ['Investigating', Validators.required],
      message: ['', Validators.required],
      priorityLevel: ['', Validators.required]
    });
  }

  public showIncident(): void {
    // console.log('Showing...' + this.currentSystem);
    this.incidentService.getIncident(this.incidentId, this.currentSystem).subscribe(
      (data: any) => {
        this.incident = data;
        console.log('Incident data is' + data);
        this.updateIncidentForm.patchValue({
          priorityLevel: this.incident.priority_level.toString(),
          incidentStatus: this.incident.status.toString(),
        });
        // this.initialPriorityLevel = this.incident.priority_level.toString();
        console.log(this.incident);
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.updateIncidentForm.invalid) {
      console.log('Invalid');
      return ;
    }
    console.log(this.incident);
    this.incident.state = this.incident.status;
    this.incident.escalation_level = 'Medium';
    return this.incidentService.updateIncident(this.incident).subscribe(
      (incident => {
        if (incident.code === '800.200.001') {
          this.location.back();
        }
      })
    );
  }
}
