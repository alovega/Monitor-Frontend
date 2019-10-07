import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-endpoint-form',
  templateUrl: './endpoint-form.component.html',
  styleUrls: ['./endpoint-form.component.scss']
})
export class EndpointFormComponent implements OnInit {
  endpointForm: FormGroup
  
  constructor( private fb: FormBuilder) {
    this.createForm()
   }

  ngOnInit() {
    
  }
  createForm(){
    this.endpointForm = this.fb.group({
        EndpointName: ['', Validators.required],
        Description: ['', Validators.required],
        Endpoint: ['', Validators.required],
        OptimalResponseTime: ['', Validators.required],
        EndpointType: ['', Validators.required],
        State: ['', Validators.required]
    })
  }

}
