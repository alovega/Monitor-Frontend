import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {RecipientService} from '../recipient.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {Recipient} from '../recipient';
import { of } from 'rxjs';
import { EscalationLevel } from 'src/app/shared/models/escalation-level';
import { NotificationType } from 'src/app/shared/models/notification-type';
import { State } from 'src/app/shared/models/state';

@Component({
  selector: 'hm-recipient-update',
  templateUrl: './recipient-update.component.html',
  styleUrls: ['./recipient-update.component.scss']
})
export class RecipientUpdateComponent implements OnInit {
  updateForm:FormGroup;
  id:number;
  recipient_id:string;
  submitted:boolean = false;
  recipient:Recipient
  States:State
  NotificationTypes:NotificationType

  constructor(
    private fb: FormBuilder, 
    private recipientService:RecipientService, 
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public location: Location) {
    this.createForm()
    this.recipient = new Recipient()
    of(this.getStates()).subscribe((data:any) => {
      console.log(data)
      this.States = data;
    });
    of(this.getNotificationTypes()).subscribe((data:any) => {
      console.log(data)
      this.NotificationTypes = data;
    });
   }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    console.log(this.id)
    this.recipientService.getItem(this.id).subscribe(response => {
      console.log(response.data.recipient);
      this.recipient = response.data.recipient
  })
  }
  createForm(){
    this.updateForm = this.fb.group({
        FirstName:['',[Validators.required, Validators.minLength(3)]],
        LastName:['',[Validators.required, Validators.minLength(3)]],
        Email: ['', [Validators.required, Validators.email]],
        PhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        NotificationType: ['', Validators.required],
        State: ['', Validators.required]
    })
  }
  getStates(){
    this.recipientService.getStates().subscribe((data) => {
      this.States = data
    })
  }  
  getNotificationTypes(){
    this.recipientService.getNotificationType().subscribe((data: any) => {
      this.NotificationTypes = data
    })
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
    this.recipient.recipient_id = this.recipient_id
    console.log(this.recipient)
  this.recipientService.updateItem(this.recipient_id, this.recipient[0]).subscribe(response => {
    if (response.code === "800.200.001"){
      console.log('message: %s, code: %s', response.message,response.code)
      this.location.back();}
    else{
      console.log('message: %s, code: %s', response.message,response.code)
    }
  })
}
}