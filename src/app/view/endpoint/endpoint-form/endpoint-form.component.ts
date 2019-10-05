import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-endpoint-form',
  templateUrl: './endpoint-form.component.html',
  styleUrls: ['./endpoint-form.component.scss']
})
export class EndpointFormComponent implements OnInit {

  endpointForm = new FormGroup({
    EndpointName: new FormControl(''),
    Description: new FormControl(''),
    Endpoint: new FormControl(''),
    OptimalResponseTime: new FormControl(''),
    EndpointType: new FormControl(''),
    State: new FormControl(''),
  })

  constructor() { }

  ngOnInit() {
  }

}
