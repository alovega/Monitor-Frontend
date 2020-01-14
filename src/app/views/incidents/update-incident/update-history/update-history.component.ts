import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin  } from 'rxjs';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';

import { IncidentService } from '../../incident.service';
import { Incident, IncidentResponse } from '../../incident';
import { SystemService } from 'src/app/shared/system.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { ToastrService } from 'ngx-toastr';
import { System } from 'src/app/shared/models/system';
import { User } from 'src/app/views/users/user';
import { EscalationLevel } from 'src/app/shared/models/escalation-level';
import { State } from 'src/app/shared/models/state';
import { HttpResponse } from '@angular/common/http';
import { LookupDataResponse, LookupData } from 'src/app/shared/models/lookup-data';

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
  users: Select2OptionData[];
  escalationLevels: Select2OptionData[];
  loading = true;
  lookupsReady = false;
  realtimeStates: Select2OptionData[];
  scheduledStates: Select2OptionData[];
  priorityLevels: Select2OptionData[];
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
    this.priorityLevels = [
      {id: '1', text: 'Priority 1'},
      {id: '2', text: 'Priority 2'},
      {id: '3', text: 'Priority 3'},
      {id: '4', text: 'Priority 4'},
      {id: '5', text: 'Priority 5'}
    ];
    this.lookupService.getLookups<LookupDataResponse>()
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          const lookupData: LookupData = response.body.data;
          this.users = lookupData.users.map((i: User) => ({id: i.id, text: i.username}));
          this.escalationLevels = lookupData.escalation_levels.map((i: EscalationLevel) => ({id: i.id, text: i.name}));
          this.realtimeStates = lookupData.realtime_incident_states.map((i: State) => ({id: i.id, text: i.name}));
          this.scheduledStates = lookupData.scheduled_incident_states.map((i: State) => ({id: i.id, text: i.name}));
        } else {}
      } else {
        // TODO: Add error handling
      }
      this.showIncident();
      this.lookupsReady = true;
    });
  }

  public showIncident(): void {
    this.incidentService.getIncident<IncidentResponse>(this.incidentId)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.incident = response.body.data;
          console.log(this.incident);
          let escalationLevel = '';
          let userId = '';
          let incidentState = '';
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
        } else {
          this.toastr.error('Could not retrieve incident', 'Incident update error');
        }
        this.loading = false;
      } else {
        // TODO: Add error checks
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.updateIncidentForm.invalid) {
      return ;
    }
    return this.incidentService.updateIncident<IncidentResponse>(this.incidentId, this.updateIncidentForm.value)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.toastr.success('Incident updated successfully', 'Success');
          this.back();
        } else {
          this.toastr.error('Incident edit failed', 'Edit incident error');
        }
      } else {
        // TODO: Add error checks
      }

    });
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
        );
      }
    });
  }

  back() {
    this.router.navigate(['dashboard', 'incidents']);
  }
}
