import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {EndpointService} from '../endpoint.service';
import {Router } from '@angular/router';
import {Endpoint} from '../model/endpoint';
import { Location } from '@angular/common';
import { State } from 'src/app/shared/models/state';
import { System } from 'src/app/shared/models/system';
import { EndpointType } from 'src/app/shared/models/endpoint-type';
import { of, forkJoin } from 'rxjs';
import { LookUpService } from 'src/app/shared/look-up.service';
import { ToastrService } from 'ngx-toastr';
import { LookUpResponse } from 'src/app/shared/models/look-up-response';
import { EndpointResponse } from '../model/endpoint-response';


@Component({
  selector: 'hm-endpoint-form',
  templateUrl: './endpoint-create.component.html',
  styleUrls: ['./endpoint-create.component.scss']
})
export class EndpointFormComponent implements OnInit {
  endpointForm: FormGroup;
  submitted = false;
  data: Endpoint;
  states: State[];
  systems: System;
  endpointTypes: EndpointType[];
  isdataReady = false;
  constructor(
    private fb: FormBuilder,
    private endpointService: EndpointService,
    private location: Location,
    private router: Router,
    private lookupService: LookUpService,
    private toastr: ToastrService) {
    this.createForm();
    this.data = new Endpoint();
    // this.getStates();
    // of(this.getSystems()).subscribe((data: any) => {
    //   this.systems = data;
    // });
    // of(this.getEndpointTypes()).subscribe((data: any) => {
    //   this.endpointTypes = data;
    // });
    const endpointTypes = this.lookupService.getEndpointStates<LookUpResponse>();
    const states = this.lookupService.getEndpointStates<LookUpResponse>();
    forkJoin([endpointTypes, states]).subscribe(results => {
      console.log(results);
      if (results[0]) {
        this.endpointTypes = results[0].body.data.endpoint_types.map((type: EndpointType) => ({id: type.id, name: type.name}));
      }
      if (results[1]) {
        this.states = results[1].body.data.endpoint_states.filter(state => state.name === 'Operational')
        .map((state: State) => ({id: state.id, name: state.name}));
      }
      this.isdataReady = true;
    });
   }

   public back(): void {
    this.router.navigate(['dashboard', 'endpoints']);
  }

  ngOnInit() {
  }
  createForm() {
    const urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.endpointForm = this.fb.group({
        EndpointName: ['', Validators.required],
        Description: ['', [Validators.required, Validators.minLength(10)]],
        URL: ['', [Validators.required, Validators.pattern(urlRegex)]],
        OptimalResponseTime: ['', Validators.required],
        EndpointType: ['', Validators.required],
        State: ['', Validators.required]
    });
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
    this.endpointService.addEndpoints<EndpointResponse>(this.data).subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.toastr.success( response.body.message);
          this.location.back();
        } else {
          this.toastr.error(response.body.message);
        }
      }
    });
  }
  getStates() {
    this.lookupService.getEndpointStates<LookUpResponse>().subscribe((response) => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.states = response.body.data.endpoint_states.filter(state => state.name === 'Operational');
        } else {
          this.toastr.error(response.body.code, 'Error while retrieving endpoint states');
        }
      }
    });
  }
  getSystems() {
    this.endpointService.getSystems().subscribe((data) => {
      this.systems = data;
    });
  }
  getEndpointTypes() {
    this.lookupService.getEndpointType<LookUpResponse>().subscribe((response) => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.endpointTypes = response.body.data.endpoint_types;
        } else {
          this.toastr.error(response.body.code, 'Error while retrieving endpoint states');
        }
      }
    });
  }
}
