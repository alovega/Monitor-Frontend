import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/must-match.validator';
@Component({
  selector: 'hm-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  updateForm:FormGroup
  submitted:boolean = false;
  constructor(private fb: FormBuilder,) {
    
   }

  ngOnInit() {
    this.createForm()
  }
  createForm(){
    this.updateForm = this.fb.group({
        FirstName:['',[Validators.required, Validators.minLength(3)]],
        LastName:['',[Validators.required, Validators.minLength(3)]],
        Email: ['', [Validators.required, Validators.email]],
        PhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        Username: ['', Validators.required],
        Password: ['', [Validators.required, Validators.minLength(6)]],
        ConfirmPassword:['',Validators.required]
    },{
      validator: MustMatch('password', 'confirmPassword')
    })
  }
   // convenience getter for easy access to form fields
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
}
