import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Endpoint } from '../endpoint';
import { of } from 'rxjs';
import { EndpointService } from '../endpoint.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/shared/models/state';
import { EndpointType } from 'src/app/shared/models/endpoint-type';

@Component({
  selector: 'hm-endpoint-update',
  templateUrl: './endpoint-update.component.html',
  styleUrls: ['./endpoint-update.component.scss']
})
export class EndpointUpdateComponent implements OnInit {
  currentSystem: any;
  currentSystemId: any;
  endpoint_id:any;
  data:any;
  updateForm:FormGroup;
  submitted:boolean = false;
  States:State;
  Endpoint_type:EndpointType;
  constructor(
    private fb: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public endpointService: EndpointService,
    private location: Location,) { 
      this.data = new Endpoint()
      this.createForm()
      of(this.getStates()).subscribe((data:any) => {
        this.States = data;
      });
    }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.currentSystemId = param['system-id'];
        // console.log(this.currentSystemId);
      });
    this.endpoint_id = this.activatedRoute.snapshot.params["id"];
    console.log(this.endpoint_id)
    this.endpointService.getItem(this.endpoint_id).subscribe(response => {
      if (response.code === "800.200.001"){
        this.data = response.data.endpoint
        console.log('successfully fetched endpoint %s', response.code)
      }
      else{
      console.log('error %s, message: %s', response.code,response.message)}
  })
}
  createForm(){
    this.updateForm = this.fb.group({
        EndpointName: ['', Validators.required],
        Description: ['', [Validators.required, Validators.minLength(10)]],
        Endpoint: ['', Validators.required],
        OptimalResponseTime: ['', Validators.required],
        State: ['', Validators.required]
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
  this.data[0].endpoint_id = this.endpoint_id
  this.endpointService.updateItem(this.endpoint_id, this.data[0]).subscribe(response => {
    if (response.code === "800.200.001"){
      console.log('message: %s, code: %s', response.message,response.code)
      this.location.back();}
    else{
      console.log('message: %s, code: %s', response.message,response.code)
    }
  })
}
getStates(){
  this.endpointService.getStates().subscribe((data) => {
    this.States = data
  })
}
}
