import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Recipient } from '../recipient';
import { State } from 'src/app/shared/models/state';
import { User } from 'src/app/shared/models/user';
import { RecipientService } from '../recipient.service';

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
  states: State;
  users: User;

  constructor(private recipientService: RecipientService, public activatedRoute: ActivatedRoute, private location: Location,
              private fb: FormBuilder, private router: Router) {
    this.data = new Recipient();
    this.createForm();
    of(this.getStates()).subscribe((data: any) => {
        this.states = data;
      });
  }

  ngOnInit() {
    this.recipientId = this.activatedRoute.snapshot.params.id;
    console.log(this.recipientId);
    this.recipientService.getRecipient(this.recipientId).subscribe(response => {
      if (response.code === '800.200.001') {
        this.data = response.data;
        console.log(this.data);
        console.log('successfully fetched endpoint %s', response.code);
      } else {
        console.log('error %s, message: %s', response.code, response.message);
      }
    });
  }
  createForm() {
    this.updateForm = this.fb.group({
        PhoneNumber: ['', Validators.required],
        State: ['', Validators.required]
    });
  }
  public back(): void {
    this.router.navigate(['system/recipients']);
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
  getStates() {
    this.recipientService.getStates().subscribe((data) => {
      this.states = data;
    });
  }
  updateRecipient() {
    this.data.recipientId = this.recipientId;
    this.recipientService.updateRecipient(this.data).subscribe(response => {
      if (response.code === '800.200.001') {
        console.log('message: %s, code: %s', response.message, response.code);
        this.location.back();
      } else {
        console.log('message: %s, code: %s', response.message, response.code);
      }
    });
  }
}
