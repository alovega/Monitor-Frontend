import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {EndpointService} from '../endpoint.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Endpoint} from '../endpoint';
import { Location } from '@angular/common';
import { State } from 'src/app/shared/models/state';
import { System } from 'src/app/shared/models/system';
import { EndpointType } from 'src/app/shared/models/endpoint-type';
import { of } from 'rxjs';
import { SystemService } from 'src/app/shared/system.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'hm-endpoint-form',
  templateUrl: './endpoint-create.component.html',
  styleUrls: ['./endpoint-create.component.scss']
})
export class EndpointFormComponent implements OnInit {
  endpointForm: FormGroup;
  submitted = false;
  currentSystem: any;
  currentSystemId: any;
  data: Endpoint;
  states: State;
  systems: System;
  endpointTypes: EndpointType;
  constructor(
    private fb: FormBuilder,
    private endpointService: EndpointService,
    private systemService: SystemService,
    private location: Location,
    private router: Router,
    private lookupService: LookUpService,
    private toastr: ToastrService) {
    this.createForm();
    this.data = new Endpoint();
    this.getStates();
    of(this.getSystems()).subscribe((data: any) => {
      this.systems = data;
    });
    of(this.getEndpointTypes()).subscribe((data: any) => {
      this.endpointTypes = data;
    });
   }

   public back(): void {
    this.router.navigate(['dashboard/endpoints']);
  }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;
  }
  createForm() {
    this.endpointForm = this.fb.group({
        EndpointName: ['', Validators.required],
        Description: ['', [Validators.required, Validators.minLength(10)]],
        URL: ['', Validators.required],
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
    this.data.system_id = this.currentSystemId;
    console.log(this.data);
    this.endpointService.addEndpoints(this.data).subscribe(response => {
      if (response.code === '800.200.001') {
        this.data = response.data;
        console.log(this.data);
        this.toastr.success( response.message);
        this.location.back();
      } else {
        this.toastr.error(response.message);
      }
    });
  }
  getStates() {
    this.lookupService.getEndpointStates().subscribe((data) => {
      this.states = data;
    });
  }
  getSystems() {
    this.endpointService.getSystems().subscribe((data) => {
      this.systems = data;
    });
  }
  getEndpointTypes() {
    this.endpointService.getEndpointTypes().subscribe((data) => {
      this.endpointTypes = data;
    });
  }
}