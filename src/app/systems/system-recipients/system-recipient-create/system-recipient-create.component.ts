import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  recipientForm: FormGroup;
  submitted = false;
  currentSystem: any;
  currentSystemId: any;
  recipient: SystemRecipient;
  EscalationLevels: EscalationLevel;
  NotificationTypes: NotificationType;
  Users: User;
  States: State;

  constructor(
    private fb: FormBuilder, private systemRecipientService: SystemRecipientService, public location: Location,
    public activatedRoute: ActivatedRoute
    ) {
    this.createForm();
    this.recipient = new SystemRecipient();
    of(this.getEscalationLevels()).subscribe((data: any) => {
      console.log(data);
      this.EscalationLevels = data;
    });
    of(this.getNotificationTypes()).subscribe((data: any) => {
      console.log(data);
      this.NotificationTypes = data;
    });
    of(this.getUsers()).subscribe((data: any) => {
      console.log(data);
      this.Users = data;
    });
    of(this.getStates()).subscribe((data: any) => {
      console.log(data);
      this.States = data;
    });
   }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.currentSystemId = param['system-id'];
        // console.log(this.currentSystemId);
      });
  }
  createForm() {
    this.recipientForm = this.fb.group({
        FirstName: ['', [Validators.required, Validators.minLength(3)]],
        LastName: ['', [Validators.required, Validators.minLength(3)]],
        Email: ['', [Validators.required, Validators.email]],
        PhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        User: ['', Validators.required],
        NotificationType: ['', Validators.required],
        EscalationLevel: ['', Validators.required],
        State: ['', Validators.required]
    });
  }

  getEscalationLevels() {
    this.systemRecipientService.getLevels().subscribe((data) => {
      this.EscalationLevels = data;
    });
  }

  getNotificationTypes() {
    this.systemRecipientService.getNotificationType().subscribe((data) => {
      this.NotificationTypes = data;
    });
  }
  getUsers() {
    this.systemRecipientService.getUsers().subscribe((data) => {
      this.Users = data;
    });
  }
  getStates() {
    this.systemRecipientService.getStates().subscribe((data) => {
      this.States = data;
    });
  }
  get f() { return this.recipientForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.recipientForm.invalid) {
        return;
    }
  }

  addRecipient() {
    this.recipient.systemId = this.currentSystemId;
    console.log(this.recipient);
    this.systemRecipientService.addSystemRecipient(this.recipient).subscribe(response => {
      if (response.code === '800.200.001') {
        this.recipient = response.data;
        console.log('message: %s, code: %s', response.message, response.code);
        this.location.back();
      }
      console.log('error: %s, message: %s', response.code, response.message);
    });
  }
}
