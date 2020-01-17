import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Recipient } from '../model/recipient';
import { State } from 'src/app/shared/models/state';
import { User } from 'src/app/shared/models/user';
import { RecipientService } from '../recipient.service';
import { ToastrService } from 'ngx-toastr';
import { LookUpService } from 'src/app/shared/look-up.service';
import { RecipientResponse } from '../model/recipient-response';
import { LookUpResponse } from 'src/app/shared/models/look-up-response';

@Component({
  selector: 'hm-recipient-create',
  templateUrl: './recipient-create.component.html',
  styleUrls: ['./recipient-create.component.scss']
})
export class RecipientCreateComponent implements OnInit {
  recipientsForm: FormGroup;
  submitted = false;
  data: Recipient;
  states: State[];
  users: User[];
  isdataReady = false;

  constructor(private recipientService: RecipientService, private location: Location, private fb: FormBuilder,
              private router: Router, private toastr: ToastrService, private lookUpService: LookUpService) {
                const users = this.lookUpService.getLookUpData<LookUpResponse>();
                const states = this.lookUpService.getLookUpData<LookUpResponse>();
                forkJoin([users, states])
                .subscribe(results => {
                  console.log(results);
                  if (results[0]) {
                    this.users = results[0].body.data.users.map((type: User) => ({id: type.id, text: type.username}));
                  }
                  if (results[1]) {
                    this.states = results[1].body.data.states.filter(state => state.name === 'Active' || state.name === 'Disabled')
                    .map((state: State) => ({id: state.id, text: state.name}));
                  }
                  this.isdataReady = true;
                });
                this.createForm();
                this.data = new Recipient();
              }

  ngOnInit() {
  }
  createForm() {
    const phoneNumber = '^(\\+\\d{1,3}[- ]?)?\\d{10}$';
    this.recipientsForm = this.fb.group({
        userId: ['', Validators.required],
        PhoneNumber: ['', [Validators.required, Validators.pattern(phoneNumber)]],
        stateId: ['', Validators.required]
    });
  }
  get f() { return this.recipientsForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.recipientsForm.invalid) {
        return;
    }
  }

  onReset() {
      this.submitted = false;
      this.recipientsForm.reset();
  }
  public back(): void {
    this.router.navigate(['dashboard', 'recipients']);
  }
  addRecipient() {
    this.recipientService.addRecipient<RecipientResponse>(this.data).subscribe(response => {
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
