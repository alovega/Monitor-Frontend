import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {SystemRecipientService} from '../system-recipient.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {SystemRecipient} from '../system-recipient';
import { of } from 'rxjs';
import { EscalationLevel } from 'src/app/shared/models/escalation-level';
import { NotificationType } from 'src/app/shared/models/notification-type';
import { State } from 'src/app/shared/models/state';
import { ToastrService } from 'ngx-toastr';

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
  recipient: SystemRecipient;
  States: State;
  NotificationTypes: NotificationType;

  constructor(
    private fb: FormBuilder, private systemRecipientService: SystemRecipientService, public router: Router,
    public activatedRoute: ActivatedRoute, public location: Location, private toastr: ToastrService) {
    this.createForm();
    this.recipient = new SystemRecipient();
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
    this.id = this.activatedRoute.snapshot.params.id;
    console.log(this.id);
    this.systemRecipientService.getItem(this.id).subscribe(response => {
      this.recipient = response;
  });
  }
  public back(): void {
    this.router.navigate(['dashboard/system-recipients']);
  }
  createForm() {
    this.updateForm = this.fb.group({
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
    this.systemRecipientService.getNotificationType().subscribe((data) => {
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
    this.recipient.systemRecipientId = this.activatedRoute.snapshot.params.id;
    this.systemRecipientService.updateItem(this.recipient).subscribe(response => {
      if (response.code === '800.200.001') {
        this.toastr.success( response.message);
        this.location.back();
      } else {
        this.toastr.error(response.message);
      }
  });
}
}