import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../users/users.service';
import { RecipientService } from '../../recipient/recipient.service';
import {SystemRecipientService} from '../../system-recipients/system-recipient.service';
import { User, UserResponse } from '../../users/user';
import { SystemRecipient, SystemRecipientResponse } from '../../system-recipients/system-recipient';
import { RecipientLookup } from '../../recipient/model/recipient';
import { NotificationType } from '../../../shared/models/notification-type';
import { EscalationLevel } from '../../../shared/models/escalation-level';
import { Recipient } from '../../recipient/model/recipient';
import { State } from '../../../shared/models/state';
import { LookUpService } from '../../../shared/look-up.service';
import { MustMatch } from '../../../shared/must-match.validator';
import { LookUpResponse } from 'src/app/shared/models/look-up-response';
import { MatStepper } from '@angular/material';
import { RecipientResponse } from '../../recipient/model/recipient-response';
import { Router } from '@angular/router';

@Component({
  selector: 'hm-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateUserComponent implements OnInit {
  public updateUserForm: FormGroup;
  public updateRecipientsForm: FormGroup;
  public updateSystemRecipientForm: FormGroup;
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
  // isLinear = true;
  // iscompleted = true;
  confirmPassword: any;
  isdataReady = false;
  constructor(
    private formBuilder: FormBuilder,
    private lookUpService: LookUpService,
    private usersService: UsersService,
    private router: Router,
    private recipientService: RecipientService,
    private systemRecipientService: SystemRecipientService,
    private toastr: ToastrService
  ) {
    const users = this.lookUpService.getLookUpData<LookUpResponse>();
    const states = this.lookUpService.getLookUpData<LookUpResponse>();
    forkJoin([states, users])
      .subscribe(results => {
        console.log(results);
        if (results[0]) {
          this.states = results[0].body.data.states.filter(state => state.name === 'Active' || state.name === 'Disabled')
            .map((state: State) => ({id: state.id, text: state.name}));
        }
        if (results[1]) {
          this.users = results[1].body.data.users.map((type: User) => ({id: type.id, text: type.username}));
        }
        this.isdataReady = true;
      });
    const escalationLevels = this.lookUpService.getLookUpData<LookUpResponse>();
    const recipients = this.lookUpService.getLookUpData<LookUpResponse>();
    const notificationTypes = this.lookUpService.getLookUpData<LookUpResponse>();
  }

  ngOnInit() {
  }
  updateUser() {
  }
  updateRecipient() {
  }
  updateSystemRecipient() {
  }
}
