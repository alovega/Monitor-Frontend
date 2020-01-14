import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {SystemRecipientService} from '../system-recipient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { SystemRecipient, SystemRecipientResponse } from '../system-recipient';
import { ToastrService } from 'ngx-toastr';
import { RecipientLookup } from '../../recipient/model/recipient';
import { NotificationType } from 'src/app/shared/models/notification-type';
import { EscalationLevel } from 'src/app/shared/models/escalation-level';
import { LookUpService } from 'src/app/shared/look-up.service';
import { LookUpResponse } from 'src/app/shared/models/look-up-response';

@Component({
  selector: 'hm-recipient-form',
  templateUrl: './system-recipient-create.component.html',
  styleUrls: ['./system-recipient-create.component.scss']
})
export class SystemRecipientCreateComponent implements OnInit {

  systemRecipientForm: FormGroup;
  submitted = false;
  escalationIndex: any;
  escalations: any;
  systemRecipient: SystemRecipient;
  escalationLevels: EscalationLevel[];
  notificationTypes: NotificationType[];
  recipients: RecipientLookup[];
  isdataReady = false;

  constructor(
    private fb: FormBuilder, private systemRecipientService: SystemRecipientService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router, private toastr: ToastrService,
    private lookUpService: LookUpService) {
      this.systemRecipient = new SystemRecipient();
      const escalationLevels = this.lookUpService.getLookUpData<LookUpResponse>();
      const recipients = this.lookUpService.getLookUpData<LookUpResponse>();
      const notificationTypes = this.lookUpService.getLookUpData<LookUpResponse>();
      forkJoin([escalationLevels, recipients, notificationTypes]).subscribe(results => {
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
        this.isdataReady = true;
      });
   }

  ngOnInit() {
    this.createForm();
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
  public back(): void {
    this.router.navigate(['dashboard', 'system-recipients']);
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
    this.systemRecipientService.addSystemRecipient<SystemRecipientResponse>(data).subscribe(response => {
      console.log(response);
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.toastr.success( response.body.message);
          this.location.back();
        } else {
          this.toastr.error(response.body.message);
        }
      }
    });
  }
}
