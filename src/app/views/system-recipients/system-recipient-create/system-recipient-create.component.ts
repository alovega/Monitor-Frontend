import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {SystemRecipientService} from '../system-recipient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { State } from 'src/app/shared/models/state';
import { SystemRecipient } from '../system-recipient';
import { SystemService } from 'src/app/shared/system.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hm-recipient-form',
  templateUrl: './system-recipient-create.component.html',
  styleUrls: ['./system-recipient-create.component.scss']
})
export class SystemRecipientCreateComponent implements OnInit {

  systemRecipientForm: FormGroup;
  submitted = false;
  currentSystem: any;
  escalationIndex: any;
  currentSystemId: any;
  escalations: any;
  systemRecipient: SystemRecipient;
  EscalationLevels: any;
  NotificationTypes: any;
  Recipients: any;
  States: State;

  constructor(
    private fb: FormBuilder, private systemRecipientService: SystemRecipientService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router, private systemService: SystemService, private toastr: ToastrService
    ) {
    this.systemRecipient = new SystemRecipient();
    of(this.getRecipients()).subscribe();
    of(this.getEscalationLevels()).subscribe();
    of(this.getNotificationTypes()).subscribe();
    console.log(this.systemRecipient);
   }

  ngOnInit() {
    this.createForm();
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;
  }
  createForm() {
    this.systemRecipientForm = this.fb.group({
        Recipient: ['', Validators.required],
        escalations: this.fb.array([this.addEscalationGroup()])
    });
  }
  addEscalationGroup() {
    return this.fb.group({
      NotificationType: ['', Validators.required],
      EscalationLevel: ['', Validators.required]
    });
  }
  addEscalations() {
    this.escalationsArray.push(this.addEscalationGroup());
  }

  deleteEscalations(index) {
    this.escalationsArray.removeAt(index);
  }
  get escalationsArray() {
    return this.systemRecipientForm.get('escalations') as FormArray;
  }

  getEscalationLevels() {
    return this.systemRecipientService.getLevels().subscribe((data) => {
      console.log(data);
      this.EscalationLevels = data;
    });
  }
  public back(): void {
    this.router.navigate(['dashboard/system-recipients']);
  }
  getNotificationTypes() {
    return this.systemRecipientService.getNotificationType().subscribe((data) => {
      console.log(data);
      this.NotificationTypes = data;
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
    if (this.systemRecipientForm.valid) {
        console.log({...this.systemRecipientForm.value});
    }
  }

  addRecipient() {
    const data = this.systemRecipientForm.value;
    data.systemId = this.currentSystemId;
    console.log(data);
    this.systemRecipientService.addSystemRecipient(data).subscribe(response => {
      if (response.code === '800.200.001') {
        this.systemRecipient = response.data;
        this.toastr.success(response.message);
        this.back();
      } else {
      this.toastr.error(response.message);
      }
    });
  }
}
