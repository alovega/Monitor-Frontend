import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {RecipientService} from '../recipient.service';
import { Router } from '@angular/router';
import {Recipient} from '../recipient';
import { of } from 'rxjs';
import { EscalationLevel } from 'src/app/shared/models/escalation-level';
import { NotificationType } from 'src/app/shared/models/notification-type';
 
@Component({
  selector: 'app-recipient-form',
  templateUrl: './recipient-create.component.html',
  styleUrls: ['./recipient-create.component.scss']
})
export class RecipientFormComponent implements OnInit {

  recipientForm:FormGroup;
  submitted:boolean = false;
  recipient:Recipient
  EscalationLevels:EscalationLevel[]
  NotificationTypes:NotificationType[]

  constructor(private fb: FormBuilder, private recipientService:RecipientService, public router: Router) {
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
   }

  ngOnInit() {
    this.getEscalationLevels()
    this.getNotificationTypes()
  }
  createForm(){
    this.recipientForm = this.fb.group({
        Email: ['', [Validators.required, Validators.email]],
        PhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        User: ['', Validators.required],
        NotificationType: ['', Validators.required],
        EscalationLevel:['', Validators.required],
        State: ['', Validators.required]
    })
  }

  getEscalationLevels(){
    this.recipientService.getLevels().subscribe((data: EscalationLevel[]) => {
      this.EscalationLevels = data
    })
  }

  
  getNotificationTypes(){
    this.recipientService.getNotificationType().subscribe((data: NotificationType[]) => {
      this.NotificationTypes = data
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
    this.recipient.date_created = new Date(Date.now()).toUTCString()

    console.log(this.recipientForm.value)
    
    this.recipientService.addEndpoints(this.recipient).subscribe(response => {
      this.router.navigate(['recipients'])
    });
  }
}