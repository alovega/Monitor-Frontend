import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Recipient, RecipientData } from '../model/recipient';
import { State } from 'src/app/shared/models/state';
import { User } from 'src/app/shared/models/user';
import { RecipientService } from '../recipient.service';
import { ToastrService } from 'ngx-toastr';
import { LookUpService } from 'src/app/shared/look-up.service';
import { RecipientResponse } from '../model/recipient-response';

@Component({
  selector: 'hm-recipient-update',
  templateUrl: './recipient-update.component.html',
  styleUrls: ['./recipient-update.component.scss']
})
export class RecipientUpdateComponent implements OnInit {
  updateForm: FormGroup;
  recipientId: any;
  submitted = false;
  data: Recipient;
  states: State[];
  users: User;
  isdataReady = false;
  stateId: string;

  constructor(private recipientService: RecipientService, public activatedRoute: ActivatedRoute, private location: Location,
              private fb: FormBuilder, private router: Router, private toastr: ToastrService, private lookUpService: LookUpService) {
                this.data = new Recipient();
                this.createForm();
  }

  ngOnInit() {
    this.recipientId = this.activatedRoute.snapshot.params.id;
    const states = this.lookUpService.getStates();
    this.recipientService.getRecipient<RecipientData>(this.recipientId).subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.data = response.body.data;
          forkJoin(states)
                .subscribe(results => {
                  console.log(results);
                  if (results[0]) {
                    this.states = results[0].map((state: State) => ({id: state.id, text: state.name}));
                    this.stateId = this.states.filter(i => i.id === this.data.stateId)[0].id;
                  }
                  this.isdataReady = true;
                });
          this.updateForm.patchValue({
            PhoneNumber: this.data.phoneNumber,
            State: this.data.stateId
          });
        } else {
          this.toastr.error(response.body.message);
        }
      }
    });
  }
  createForm() {
    const phoneNumber = '^(\\+\\d{1,3}[- ]?)?\\d{10}$';
    this.updateForm = this.fb.group({
        PhoneNumber: ['', [Validators.required, Validators.pattern(phoneNumber)]],
        State: ['', Validators.required]
    });
  }
  public back(): void {
    this.router.navigate(['dashboard/recipients']);
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
  updateRecipient() {
    this.data = this.updateForm.value;
    this.data.recipientId = this.recipientId;
    this.recipientService.updateRecipient<RecipientResponse>(this.data).subscribe(response => {
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
