import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { IncidentService } from '../../incident.service';
import { Incident } from '../../incident';
import { SystemService } from 'src/app/shared/system.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { ToastrService } from 'ngx-toastr';

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
  loading = true;
  realtimeStates: any;
  scheduledStates: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private lookupService: LookUpService,
    private incidentService: IncidentService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
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
    this.lookupService.getRealtimeIncidentStates().subscribe(
      (realtimeStates) => this.realtimeStates = realtimeStates
    );
    this.lookupService.getRealtimeIncidentStates().subscribe(
      (scheduledStates) => this.scheduledStates = scheduledStates
    );
    this.showIncident();
    this.createUpdateIncidentForm();
  }

  createUpdateIncidentForm() {
    this.updateIncidentForm = this.formBuilder.group({
      incidentStatus: ['', Validators.required],
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
        // console.log(this.incident);
        let escalation_level: string;
        let user: string;
        if (incident.incident_updates.length) {
          escalation_level = incident.incident_updates[0].escalation_level;
          if (incident.incident_updates[0].user) {
            user = incident.incident_updates[0].user;
          } else {
            user = '';
          }
          console.log(user);
        }
        this.updateIncidentForm.patchValue({
          priorityLevel: this.incident.priority_level.toString(),
          incidentStatus: this.incident.state,
          escalationLevel: escalation_level,
          user: user
        });
        this.loading = false;
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.updateIncidentForm.invalid) {
      console.log('Invalid');
      return ;
    }
    // console.log(this.incident);
    return this.incidentService.updateIncident(this.incident).subscribe(
      (incident => {
        console.log(this.incident);
        console.log(incident);
        if (incident.code === '800.200.001') {
          this.toastr.success('Incident updated successfully', 'Incident update success');
          this.back();
        } else {
          this.toastr.success('Incident updated successfully', 'Incident update success');

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
