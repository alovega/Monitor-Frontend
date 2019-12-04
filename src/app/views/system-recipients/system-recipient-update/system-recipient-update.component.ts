import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {SystemRecipientService} from '../system-recipient.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {SystemRecipient, SystemRecipientResponse} from '../system-recipient';
import { of, forkJoin } from 'rxjs';
import { EscalationLevel } from 'src/app/shared/models/escalation-level';
import { NotificationType } from 'src/app/shared/models/notification-type';
import { State } from 'src/app/shared/models/state';
import { ToastrService } from 'ngx-toastr';
import { LookUpService } from 'src/app/shared/look-up.service';
import { LookUpResponse } from 'src/app/shared/models/look-up-response';
import { Recipient, RecipientLookup } from '../../recipient/model/recipient';
import { combineAll } from 'rxjs/operators';

@Component({
  selector: 'hm-recipient-update',
  templateUrl: './system-recipient-update.component.html',
  styleUrls: ['./system-recipient-update.component.scss']
})
export class SystemRecipientUpdateComponent implements OnInit {
  updateForm: FormGroup;
  id: number;
  recipientId: string;
  submitted = false;
  systemRecipient: SystemRecipient;
  recipients: Recipient[];
  states: State[];
  notificationTypes: NotificationType[];
  escalationLevels: EscalationLevel[];
  isdataReady = false;

  constructor(
    private fb: FormBuilder, private systemRecipientService: SystemRecipientService, public router: Router,
    public activatedRoute: ActivatedRoute, public location: Location, private toastr: ToastrService, public lookUpService: LookUpService) {
    this.systemRecipient = new SystemRecipient();
   }

  ngOnInit() {
    const escalationLevels = this.lookUpService.getLookUpData<LookUpResponse>();
    const states = this.lookUpService.getLookUpData<LookUpResponse>();
    const recipients = this.lookUpService.getLookUpData<LookUpResponse>();
    const notificationTypes = this.lookUpService.getLookUpData<LookUpResponse>();
    this.id = this.activatedRoute.snapshot.params.id;
    this.systemRecipientService.getItem<SystemRecipientResponse>(this.id).subscribe(response => {
      console.log(response);
      console.log(response.body.data.escalationLevels);
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.systemRecipient = response.body.data;
          forkJoin([escalationLevels, recipients, notificationTypes, states]).subscribe(results => {
          if (results[0]) {
            this.escalationLevels = results[0].body.data.escalation_levels
              .map((escalationLevel: EscalationLevel) => ({id: escalationLevel.id, text: escalationLevel.name}));
          }
          if (results[1]) {
            this.recipients = results[1].body.data.recipients
            .map((recipient: RecipientLookup) => ({id: recipient.id, text: recipient.userName}));
          }
          if (results[2]) {
            this.notificationTypes = results[2].body.data.notification_types
              .map((notificationType: NotificationType) => ({id: notificationType.id, text: notificationType.name}));
          }
          if (results[3]) {
            this.states = results[3].body.data.states.filter(state => state.name === 'Active' || state.name === 'Disabled')
            .map((state: State) => ({id: state.id, text: state.name}));
          }

          this.isdataReady = true;
        });
          this.createForm();
          this.updateForm.patchValue({
            Recipient: this.systemRecipient.recipientId,
            escalations: this.systemRecipient.escalationLevels.forEach(item => this.addEscalations())
          });
      }
    }
  });
  }
  public back(): void {
    this.router.navigate(['dashboard', 'system-recipients']);
  }
  createForm() {
    this.updateForm = this.fb.group({
      Recipient: ['', Validators.required],
      escalations: this.fb.array([])
    });
  }
  addEscalationGroup() {
    return this.fb.group({
      NotificationType: ['', Validators.required],
      EscalationLevel: ['', Validators.required],
      State: ['', Validators.required]
    });
  }
  addEscalations() {
    this.escalationsArray.push(this.addEscalationGroup());
    this.patchEscalationValues();
  }

  deleteEscalations(index) {
    this.escalationsArray.removeAt(index);
  }
  get escalationsArray() {
    return this.updateForm.get('escalations') as FormArray;
  }
  patchEscalationValues() {
    this.escalationsArray.patchValue(this.systemRecipient.escalationLevels);
  }
  get f() { return this.updateForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.updateForm.valid) {
        console.log({...this.updateForm.value});
    }
  }
  updateRecipient() {
    this.systemRecipient = this.updateForm.value;
    this.systemRecipient.systemRecipientId = this.activatedRoute.snapshot.params.id;
    this.systemRecipientService.updateItem(this.systemRecipient).subscribe(response => {
      if (response.code === '800.200.001') {
        this.toastr.success( response.message);
        this.location.back();
      } else {
        this.toastr.error(response.message);
      }
  });
}
}
