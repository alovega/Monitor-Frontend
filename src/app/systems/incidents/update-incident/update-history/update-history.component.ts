import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { IncidentService } from '../../incident.service';
import { Incident } from '../../incident';
import { SystemService } from 'src/app/shared/system.service';

@Component({
  selector: 'hm-update-history',
  templateUrl: './update-history.component.html',
  styleUrls: ['./update-history.component.scss']
})
export class UpdateHistoryComponent implements OnInit {
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
    // this.incidentId = this.activatedRoute.snapshot.paramMap.get('incident-id');
    this.incident = new Incident();
  }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.systemId = param['system-id'];
        this.incidentId = param['incident-id'];
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
        // console.log('Incident data is' + this.incident.status);
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

  removeIncident(incidentId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this incident!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        console.log(incidentId);
        this.incidentService.deleteIncident(incidentId).subscribe(
          response => {
            if (response.code == '800.200.001') {
                  Swal.fire(
                    'Deleted!',
                    'This incident has been deleted.',
                    'success'
                  ).then(() => {
                    setTimeout(() => {
                      this.location.back();
                    }, 1000);
                  })
            } else {
              Swal.fire(
                'Failed!',
                'This incident could not be deleted.',
                'error'
              )
            }
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          '',
          'error'
        )
      }
    })
  }

  back() {
    this.location.back();
  }
}