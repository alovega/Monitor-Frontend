import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {SystemRecipientService} from '../system-recipient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { EscalationLevel } from 'src/app/shared/models/escalation-level';
import { State } from 'src/app/shared/models/state';
import { User } from 'src/app/shared/models/user';
import { NotificationType } from 'src/app/shared/models/notification-type';
import { SystemRecipient } from '../system-recipient';


@Component({
  selector: 'hm-recipient-form',
  templateUrl: './system-recipient-create.component.html',
  styleUrls: ['./system-recipient-create.component.scss']
})
export class SystemRecipientFormComponent implements OnInit {

  systemRecipientForm: FormGroup;
  submitted = false;
  currentSystem: any;
  escalationIndex: any;
  currentSystemId: any;
  escalations: any;
  systemRecipient: SystemRecipient;
  EscalationLevels: EscalationLevel;
  NotificationTypes: NotificationType;
  Recipients: any;
  States: State;

  constructor(
    private fb: FormBuilder, private systemRecipientService: SystemRecipientService, public location: Location,
    public activatedRoute: ActivatedRoute
    ) {
    this.systemRecipient = new SystemRecipient();
    of(this.getRecipients()).subscribe((data: any) => {
      console.log(data);
      this.Recipients = data;
    });
    of(this.getEscalationLevels()).subscribe((data: any) => {
      this.EscalationLevels = data;
    });
    of(this.getNotificationTypes()).subscribe((data: any) => {
      this.NotificationTypes = data;
    });
   }

  ngOnInit() {
    this.getNotificationTypes();
    this.createForm();
  }
  createForm() {
    this.systemRecipientForm = this.fb.group({
        Recipient: ['', Validators.required],
        escalations: this.fb.array([this.escalations])
    });
  }
  get escalation() {
    return this.fb.group({
      NotificationType: ['', Validators.required],
      EscalationLevel: ['', Validators.required]
    });
  }


  addEscalations() {
    (this.systemRecipientForm.controls.escalations as FormArray).push(this.escalations);
  }

  deleteEscalations(index) {
    (this.systemRecipientForm.controls.escalations as FormArray).removeAt(index);
  }

  getEscalationLevels() {
    return this.systemRecipientService.getLevels().subscribe((data) => {
      console.log(data);
      this.EscalationLevels = data;
    });
  }

  getNotificationTypes() {
    return this.systemRecipientService.getNotificationType().subscribe((data) => {
      this.NotificationTypes = data;
      console.log(this.NotificationTypes);
    });
  }
  getRecipients() {
    return this.systemRecipientService.getRecipients().subscribe((data) => {
      console.log(data);
      this.Recipients = data;
    });
  }
  getStates() {
    this.systemRecipientService.getStates().subscribe((data) => {
      this.States = data;
    });
  }
  get f() { return this.systemRecipientForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.systemRecipientForm.invalid) {
        return;
    }
  }

  addRecipient() {
    console.log(this.systemRecipient);
    this.systemRecipient.systemId = this.currentSystemId;
    console.log(this.systemRecipient);
    this.systemRecipientService.addSystemRecipient(this.systemRecipient).subscribe(response => {
      if (response.code === '800.200.001') {
        this.systemRecipient = response.data;
        console.log('message: %s, code: %s', response.message, response.code);
        this.location.back();
      }
      console.log('error: %s, message: %s', response.code, response.message);
    });
  }
}
