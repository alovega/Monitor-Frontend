import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {RecipientService} from '../recipient.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Recipient} from '../recipient';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { EscalationLevel } from 'src/app/shared/models/escalation-level';
import { State } from 'src/app/shared/models/state';
import { User } from 'src/app/shared/models/user';
import { NotificationType } from 'src/app/shared/models/notification-type';
 
@Component({
  selector: 'app-recipient-form',
  templateUrl: './recipient-create.component.html',
  styleUrls: ['./recipient-create.component.scss']
})
export class RecipientFormComponent implements OnInit {

  recipientForm:FormGroup;
  submitted:boolean = false;
  currentSystem: any;
  currentSystemId: any;
  recipient:Recipient
  EscalationLevels:EscalationLevel
  NotificationTypes:NotificationType
  Users:User
  States:State

  constructor(
    private fb: FormBuilder, 
    private recipientService:RecipientService, 
    public location: Location,
    public activatedRoute: ActivatedRoute
    ) {
    this.createForm()
    this.recipient = new Recipient()
    of(this.getEscalationLevels()).subscribe((data:any) => {
      console.log(data)
      this.EscalationLevels = data;
    });
    of(this.getNotificationTypes()).subscribe((data:any) => {
      console.log(data)
      this.NotificationTypes = data;
    });
    of(this.getUsers()).subscribe((data:any) => {
      console.log(data)
      this.Users = data
    });
    of(this.getStates()).subscribe((data:any) => {
      console.log(data)
      this.States = data;
    });
   }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.currentSystemId = param['system-id'];
        // console.log(this.currentSystemId);
      });
  }
  createForm(){
    this.recipientForm = this.fb.group({
        FirstName:['', [Validators.required, Validators.minLength(3)]],
        LastName:['', [Validators.required, Validators.minLength(3)]],
        Email: ['', [Validators.required, Validators.email]],
        PhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        User: ['', Validators.required],
        NotificationType: ['', Validators.required],
        EscalationLevel:['', Validators.required],
        State: ['', Validators.required]
    })
  }

  getEscalationLevels(){
    this.recipientService.getLevels().subscribe((data) => {
      this.EscalationLevels = data
    })
  }

  getNotificationTypes(){
    this.recipientService.getNotificationType().subscribe((data) => {
      this.NotificationTypes = data
    })
  }
  getUsers(){
    this.recipientService.getUsers().subscribe((data) => {
      this.Users = data
    })
  }
  getStates(){
    this.recipientService.getStates().subscribe((data) => {
      this.States = data
    })
  }
  get f() { return this.recipientForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.recipientForm.invalid) {
        return;
    }
  }

  addRecipient() {
    this.recipient.system_id = this.currentSystemId
    console.log(this.recipient)
    this.recipientService.addRecipient(this.recipient).subscribe(response => {
      if (response.code === "800.200.001"){
        this.recipient = response.data
        console.log('message: %s, code: %s', response.message,response.code)
        this.location.back()
      }
      else{
      console.log('error: %s, message: %s', response.code,response.message)
      }
    });
  }
}