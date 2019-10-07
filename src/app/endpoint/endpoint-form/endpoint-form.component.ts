import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-endpoint-form',
  templateUrl: './endpoint-form.component.html',
  styleUrls: ['./endpoint-form.component.scss']
})
export class EndpointFormComponent implements OnInit {
  endpointForm: FormGroup
  
  constructor() { }

  ngOnInit() {
    this.endpointForm = new FormGroup({
      EndpointName: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      Description: new FormControl(''),
      Endpoint: new FormControl(''),
      OptimalResponseTime: new FormControl(''),
      EndpointType: new FormControl(''),
      State: new FormControl(''),
    },  { updateOn: 'submit' })
  }

  get input() { return this.endpointForm.get('minLength'); }

  onSubmit() {
    this.endpointForm.controls.input.markAsTouched();
  }

}
