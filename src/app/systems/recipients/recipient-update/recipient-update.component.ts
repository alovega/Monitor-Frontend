import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {RecipientService} from '../recipient.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Recipient} from '../recipient';
import { of } from 'rxjs';
import { EscalationLevel } from 'src/app/shared/models/escalation-level';
import { NotificationType } from 'src/app/shared/models/notification-type';

@Component({
  selector: 'hm-recipient-update',
  templateUrl: './recipient-update.component.html',
  styleUrls: ['./recipient-update.component.scss']
})
export class RecipientUpdateComponent implements OnInit {
  updateForm:FormGroup;
  id:number;
  submitted:boolean = false;
  recipient:Recipient
  EscalationLevels:EscalationLevel[]
  NotificationTypes:NotificationType[]

  constructor(private fb: FormBuilder, private recipientService:RecipientService, public router: Router,
    public activatedRoute: ActivatedRoute,) {
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
    this.id = this.activatedRoute.snapshot.params["id"];
    console.log(this.id)
    this.recipientService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.recipient = response
  })
  }
  createForm(){
    this.updateForm = this.fb.group({
        Email: ['', [Validators.required, Validators.email]],
        PhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
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
    this.recipient.date_modified = new Date(Date.now()).toUTCString()
    this.recipientService.updateItem(this.id, this.recipient).subscribe(response => {
      this.router.navigate(['recipients']);
    })
  }
}