import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { IncidentService } from '../../incident.service';
import { Incident, IncidentResponse } from '../../incident';
import { SystemService } from 'src/app/shared/system.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { ToastrService } from 'ngx-toastr';
import { DropdownItem } from 'src/app/layout/top-nav-bar/dropdown-item';
import { System } from 'src/app/shared/models/system';

@Component({
  selector: 'hm-update-history',
  templateUrl: './update-history.component.html',
  styleUrls: ['./update-history.component.scss']
})
export class UpdateHistoryComponent implements OnInit {
  updateIncidentForm: FormGroup;
  submitted = false;
  incident: Incident;
  incidentId: string;
  currentSystem: System;
  users: DropdownItem[];
  escalationLevels: DropdownItem[];
  loading = true;
  realtimeStates: DropdownItem[];
  scheduledStates: DropdownItem[];
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
    this.updateIncidentForm = this.formBuilder.group({
      state: ['', Validators.required],
      description: ['', Validators.required],
      priority_level: ['', Validators.required],
      user: [''],
      escalation_level: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    if (this.currentSystem) {
      this.showIncident();
    }
    this.lookupService.getUsers().subscribe(
      (res) => this.users = res.map(i => ({id: i.id, text: i.username}))
    );
    this.lookupService.getEscalationLevel().subscribe(
      (res) => this.escalationLevels = res.map(i => ({id: i.id, text: i.name}))
    );
    this.lookupService.getRealtimeIncidentStates().subscribe(
      (res) => this.realtimeStates = res.map(i => ({id: i.id, text: i.name}))
    );
    this.lookupService.getScheduledIncidentStates().subscribe(
      (res) => this.scheduledStates = res.map(i => ({id: i.id, text: i.name}))
    );
    this.showIncident();
  }

  public showIncident(): void {
    this.incidentService.getIncident(this.incidentId).subscribe(
      (response: IncidentResponse) => {
        if (response.code === '800.200.001') {
          this.incident = response.data;
          let escalationLevel = '';
          let userId = '';
          let incidentState: string = '';
          if (this.incident.incident_updates.length) {
            escalationLevel = this.incident.incident_updates[0].escalation_level_id;
            incidentState = this.incident.incident_updates[0].state_id;
            if (this.incident.incident_updates[0].user_id) {
              userId = this.incident.incident_updates[0].user_id;
            } else {
              userId = '';
            }
          }
          this.updateIncidentForm.patchValue({
            state: incidentState,
            priority_level: this.incident.priority_level,
            user: userId,
            escalation_level: escalationLevel
          });
        }
        this.loading = false;
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.updateIncidentForm.invalid) {
      return ;
    }
    return this.incidentService.updateIncident(this.incidentId, this.updateIncidentForm.value).subscribe(
      (incident: IncidentResponse) => {
        if (incident.code === '800.200.001') {
          this.toastr.success('Incident updated successfully', 'Incident update success');
          this.back();
        } else {
          this.toastr.error('Incident could not be updated', 'Incident update error');
        }
      }
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
