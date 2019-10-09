import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {EndpointService} from '../endpoint.service'
import { Router } from '@angular/router'
import {Endpoint} from '../endpoint';


@Component({
  selector: 'app-endpoint-form',
  templateUrl: './endpoint-form.component.html',
  styleUrls: ['./endpoint-form.component.scss']
})
export class EndpointFormComponent implements OnInit {
  endpointForm: FormGroup
  submitted = false;
  data:Endpoint
  constructor( private fb: FormBuilder, private add:EndpointService, public router: Router ) {
    this.createForm()
    this.data = new Endpoint()
   }

  ngOnInit() {
    
  }
  createForm(){
    this.endpointForm = this.fb.group({
        EndpointName: ['', Validators.required],
        Description: ['', [Validators.required, Validators.minLength(10)]],
        Endpoint: ['', Validators.required],
        OptimalResponseTime: ['', Validators.required],
        EndpointType: ['', Validators.required],
        SystemId:['', Validators.required],
        State: ['', Validators.required]
    })
  }
  get f() { return this.endpointForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.endpointForm.invalid) {
        return;
    }
}

onReset() {
    this.submitted = false;
    this.endpointForm.reset();
}

addEndpoint() {
  this.data.date_created = new Date().getUTCDate()
  
  this.add.addEndpoints(this.data).subscribe(response => {
    this.router.navigate(['endpoint'])
  });
}

}
