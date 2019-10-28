import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/must-match.validator';
@Component({
  selector: 'hm-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  profileUpdateForm:FormGroup
  submitted:boolean = false;
  constructor(private fb: FormBuilder,) {
    this.createForm()
   }

  ngOnInit() {
  }
  createForm(){
    this.profileUpdateForm = this.fb.group({
        FirstName:['',[Validators.required, Validators.minLength(3)]],
        LastName:['',[Validators.required, Validators.minLength(3)]],
        Email: ['', [Validators.required, Validators.email]],
        PhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        Username: ['', Validators.required],
    })
  }
   // convenience getter for easy access to form fields
   get f() { return this.profileUpdateForm.controls; }

   onSubmit() {
       this.submitted = true;

       // stop here if form is invalid
       if (this.profileUpdateForm.invalid) {
           return;
       }
      }

   onReset() {
       this.submitted = false;
       this.profileUpdateForm.reset();
   }
}
