import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {SystemRecipientService} from '../system-recipient.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {Recipient} from '../system-recipient';
import { of } from 'rxjs';
import { EscalationLevel } from 'src/app/shared/models/escalation-level';
import { NotificationType } from 'src/app/shared/models/notification-type';
import { State } from 'src/app/shared/models/state';

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
  recipient: Recipient;
  States: State;
  NotificationTypes: NotificationType;

  constructor(
    private fb: FormBuilder, private systemRecipientService: SystemRecipientService, public router: Router,
    public activatedRoute: ActivatedRoute, public location: Location) {
    this.createForm();
    this.recipient = new Recipient();
    of(this.getStates()).subscribe((data: any) => {
      console.log(data);
      this.States = data;
    });
    of(this.getNotificationTypes()).subscribe((data: any) => {
      console.log(data);
      this.NotificationTypes = data;
    });
   }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    this.systemRecipientService.getItem(this.id).subscribe(response => {
      console.log(response.data.recipient);
      this.recipient = response.data.recipient;
  });
  }
  createForm() {
    this.updateForm = this.fb.group({
        FirstName: ['', [Validators.required, Validators.minLength(3)]],
        LastName: ['', [Validators.required, Validators.minLength(3)]],
        Email: ['', [Validators.required, Validators.email]],
        PhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        NotificationType: ['', Validators.required],
        State: ['', Validators.required]
    });
  }
  getStates() {
    this.systemRecipientService.getStates().subscribe((data) => {
      this.States = data;
    });
  }
  getNotificationTypes() {
    this.systemRecipientService.getNotificationType().subscribe((data: any) => {
      this.NotificationTypes = data;
    });
  }
  get f() { return this.updateForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
        return;
    }
  }
  onReset() {
    this.submitted = false;
    this.updateForm.reset();
  }
  update() {
    this.recipient.recipientId = this.recipientId;
    console.log(this.recipient);
    this.systemRecipientService.updateItem(this.recipientId, this.recipient[0]).subscribe(response => {
      if (response.code === '800.200.001') {
        console.log('message: %s, code: %s', response.message, response.code);
        this.location.back();
      }
      console.log('message: %s, code: %s', response.message, response.code);
    });
  }
}