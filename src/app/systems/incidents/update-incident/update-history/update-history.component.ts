import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { IncidentService } from '../../incident.service';
import { Incident } from '../../incident';
import { SystemService } from 'src/app/shared/system.service';
import { LookUpService } from 'src/app/shared/look-up.service';

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
  users: any;
  escalationLevels: any;
  isLoaded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private lookupService: LookUpService,
    private incidentService: IncidentService,
    private formBuilder: FormBuilder,
    private location: Location,
    private systemService: SystemService
  ) {
    this.activatedRoute.parent.params.subscribe(params => {
      this.incidentId = params['incident-id'];
    });
    this.incident = new Incident();
  }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.systemId = this.currentSystem.id;
    if (this.currentSystem) {
      this.showIncident();
    }
    this.lookupService.getUsers().subscribe(
      (users) => this.users = users
    );

    this.lookupService.getEscalationLevel().subscribe(
      (levels) => this.escalationLevels = levels
    );
    // this.showIncident();
    this.createUpdateIncidentForm();
    this.isLoaded = true;
  }

  createUpdateIncidentForm() {
    this.updateIncidentForm = this.formBuilder.group({
      incidentStatus: ['Investigating', Validators.required],
      message: ['', Validators.required],
      priorityLevel: ['', Validators.required],
      user: [''],
      escalationLevel: ['', Validators.required]
    });
  }

  public showIncident(): void {
    this.incidentService.getIncident(this.incidentId, this.currentSystem).subscribe(
      (incident: any) => {
        this.incident = incident;
        this.updateIncidentForm.patchValue({
          priorityLevel: this.incident.priority_level.toString(),
          incidentStatus: this.incident.status.toString(),
        });
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
    this.incident.state = this.updateIncidentForm.controls.incidentStatus.value;
    this.incident.escalation_level = 'Medium';
    return this.incidentService.updateIncident(this.incident).subscribe(
      (incident => {
        if (incident.code === '800.200.001') {
          this.router.navigate(['system/incidents']);
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
            if (response.code === '800.200.001') {
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
    this.router.navigate(['system/incidents']);
  }
}
