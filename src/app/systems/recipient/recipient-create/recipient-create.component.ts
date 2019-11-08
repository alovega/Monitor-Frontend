import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Recipient } from '../recipient';
import { State } from 'src/app/shared/models/state';
import { User } from 'src/app/shared/models/user';
import { RecipientService } from '../recipient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hm-recipient-create',
  templateUrl: './recipient-create.component.html',
  styleUrls: ['./recipient-create.component.scss']
})
export class RecipientCreateComponent implements OnInit {
  recipientsForm: FormGroup;
  submitted = false;
  data: Recipient;
  states: State;
  users: User;

  constructor(private recipientService: RecipientService, private location: Location, private fb: FormBuilder,
              private router: Router, private toastr: ToastrService) {
    this.createForm();
    this.data = new Recipient();
    of(this.getStates()).subscribe((data: any) => {
      this.states = data;
    });
    of(this.getUsers()).subscribe((data: any) => {
      this.users = data;
    });
   }

  ngOnInit() {
  }
  createForm() {
    this.recipientsForm = this.fb.group({
        userId: ['', Validators.required],
        PhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
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
    this.router.navigate(['system/recipients']);
  }
  getStates() {
    this.recipientService.getStates().subscribe((data) => {
      this.states = data;
    });
  }
  getUsers() {
    this.recipientService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
  addRecipient() {
    this.recipientService.addRecipient(this.data).subscribe(response => {
      console.log(this.data);
      if (response.code === '800.200.001') {
        this.toastr.success(response.message);
        this.location.back();
      } else {
        this.toastr.error(response.message);
      }
    });
  }

}
