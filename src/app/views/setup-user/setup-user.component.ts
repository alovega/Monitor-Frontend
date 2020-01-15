import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../users/users.service';
import { RecipientService } from '../recipient/recipient.service';
import {SystemRecipientService} from '../system-recipients/system-recipient.service';
import { User, UserResponse } from '../users/user';
import { SystemRecipient, SystemRecipientResponse } from '../system-recipients/system-recipient';
import { RecipientLookup } from '../recipient/model/recipient';
import { NotificationType } from '../../shared/models/notification-type';
import { EscalationLevel } from '../../shared/models/escalation-level';
import { Recipient } from '../recipient/model/recipient';
import { State } from '../../shared/models/state';
import { LookUpService } from 'src/app/shared/look-up.service';
import { MustMatch } from '../../shared/must-match.validator';
import { LookUpResponse } from 'src/app/shared/models/look-up-response';
import { MatStepper } from '@angular/material';
import { RecipientResponse } from '../recipient/model/recipient-response';
import { Router } from '@angular/router';
@Component({
  selector: 'hm-setup-user',
  templateUrl: './setup-user.component.html',
  styleUrls: ['./setup-user.component.scss']
})
export class SetupUserComponent implements OnInit {
  public addUserForm: FormGroup;
  public recipientsForm: FormGroup;
  public systemRecipientForm: FormGroup;
  user: User;
  users: User[];
  isEditable = false;
  data: Recipient;
  submitted = false;
  escalationIndex: any;
  escalations: any;
  systemRecipient: SystemRecipient;
  escalationLevels: EscalationLevel[];
  notificationTypes: NotificationType[];
  recipients: RecipientLookup[];
  states: State[];
  isLinear = true;
  confirmPassword: any;
  isdataReady = false;
  constructor(
    private formBuilder: FormBuilder,
    private lookUpService: LookUpService,
    private usersService: UsersService,
    private router: Router,
    private recipientService: RecipientService,
    private systemRecipientService: SystemRecipientService,
    private toastr: ToastrService) {
    const users = this.lookUpService.getLookUpData<LookUpResponse>();
    const states = this.lookUpService.getLookUpData<LookUpResponse>();
    forkJoin([states])
      .subscribe(results => {
        console.log(results);
        if (results[0]) {
          this.states = results[0].body.data.states.filter(state => state.name === 'Active' || state.name === 'Disabled')
            .map((state: State) => ({id: state.id, text: state.name}));
        }
        this.isdataReady = true;
      });
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
    this.createForm();
    this.user = new User();
    this.data = new Recipient();
    this.systemRecipient = new SystemRecipient();
    }
  ngOnInit() {
  }
  public navigateToUsers(): void {
    this.router.navigate(['dashboard', 'users']);
  }
  createForm() {
    this.addUserForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstname: [''],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });
    const phoneNumber = '^(\\+\\d{1,3}[- ]?)?\\d{10}$';
    this.recipientsForm = this.formBuilder.group({
        userId: ['', Validators.required],
        PhoneNumber: ['', [Validators.required, Validators.pattern(phoneNumber)]],
        stateId: ['', Validators.required],
    });
    this.systemRecipientForm = this.formBuilder.group({
      Recipient: ['', Validators.required],
      escalations: this.formBuilder.array([this.addEscalationGroup()])
    });
  }
  addEscalationGroup() {
    return this.formBuilder.group({
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
  createUser(stepper?: MatStepper) {
    this.submitted = true;
    console.log(this.addUserForm.value);
    this.usersService.createUser<UserResponse>(this.addUserForm.value)
    .subscribe(response => {
      console.log(response);
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.toastr.success('User created successfully', 'User creation success');
          if (stepper !== undefined) {
            const users = this.lookUpService.getLookUpData<LookUpResponse>();
            forkJoin([users]).subscribe(results => {
              console.log(results);
              if (results[0]) {
                this.users = results[0].body.data.users.map((type: User) => ({id: type.id, text: type.username}));
              }
              this.isdataReady = true;
            });
            stepper.next();
          }
        } else {
          this.toastr.error(response.body.message, 'User creation error');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }
  createRecipient(stepper?: MatStepper) {
    this.submitted = true;
    console.log(this.recipientsForm.value);
    this.recipientService.addRecipient<RecipientResponse>(this.data)
    .subscribe(response => {
      console.log(response);
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.toastr.success('Recipient created successfully', 'Recipient creation success');
          if (stepper !== undefined) {
            const recipients = this.lookUpService.getLookUpData<LookUpResponse>();
            forkJoin([recipients]).subscribe(results => {
              if (results[0]) {
                this.recipients = results[0].body.data.recipients
                .map((recipient: RecipientLookup) => ({id: recipient.id, text: recipient.userName}));
              }
              this.isdataReady = true;
            });
            stepper.next();
          }
        } else {
          this.toastr.error(response.body.message, 'Recipient creation error');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }
  createSystemRecipient(stepper?: MatStepper) {
    this.submitted = true;
    console.log(this.systemRecipientForm.value);
    this.systemRecipientService.addSystemRecipient<SystemRecipientResponse>(this.systemRecipientForm.value)
    .subscribe(response => {
      console.log(response);
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.toastr.success('System Recipient created successfully', 'System Recipient creation success');
          if (stepper !== undefined) {
            stepper.next();
          }
        } else {
          this.toastr.error(response.body.message, 'System Recipient creation error');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }
}
