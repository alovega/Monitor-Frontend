import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-recipient-form',
  templateUrl: './recipient-create.component.html',
  styleUrls: ['./recipient-create.component.scss']
})
export class RecipientFormComponent implements OnInit {

  recipientForm = new FormGroup({
    RecipientName: new FormControl(''),
    RecipientLastName: new FormControl(''),
    Email: new FormControl(''),
    PhoneNumber: new FormControl(''),
    User: new FormControl(''),
  })

  constructor() { }

  ngOnInit() {
  }

}
