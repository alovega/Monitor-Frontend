import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { IncidentService } from '../incident.service';
import { Incident } from '../incident';
import { SystemService } from 'src/app/shared/system.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { ToastrService } from 'ngx-toastr';

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
  users: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private incidentService: IncidentService,
    private formBuilder: FormBuilder,
    private location: Location,
    private systemService: SystemService,
    private router: Router,
    private lookupService: LookUpService,
    private toastr: ToastrService
  ) {
    this.incidentId = this.activatedRoute.snapshot.paramMap.get('incident-id');
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
    this.createUpdateIncidentForm();
  }

  createUpdateIncidentForm() {
    this.updateIncidentForm = this.formBuilder.group({
      incidentStatus: ['Investigating', Validators.required],
      message: ['', Validators.required],
      priorityLevel: ['', Validators.required],
      user: ['']
    });
  }

  public showIncident(): void {
    // console.log('Showing...' + this.currentSystem);
    this.incidentService.getIncident(this.incidentId, this.currentSystem).subscribe(
      (data: any) => {
        this.incident = data;
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
    this.incident.state = this.incident.status;
    this.incident.escalation_level = 'Medium';

    return this.incidentService.updateIncident(this.incident).subscribe(
      (incident => {
        if (incident.code === '800.200.001') {
          this.toastr.success('Incident updated successfully', 'Incident update success');
          this.back();
        } else {
          this.toastr.error('Incident could not be updated', 'Incident update error');
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
              this.toastr.success('Incident deleted successfully', 'Incident delete success');
              this.back();
            } else {
              this.toastr.error('Incident could not be deleted', 'Incident delete error');
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
    this.router.navigate(['dashboard/incidents']);
  }
}
