import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { Endpoint } from '../../endpoint/endpoint';
import { State } from '../../../shared/models/state';
import { System } from '../../../shared/models/system';
import { EndpointType } from '../../../shared/models/endpoint-type';
import { EndpointService } from '../../endpoint/endpoint.service';
import { SystemService } from 'src/app/shared/system.service';

@Component({
  selector: 'hm-add-endpoints',
  templateUrl: './add-endpoints.component.html',
  styleUrls: ['./add-endpoints.component.scss']
})
export class AddEndpointsComponent implements OnInit {
  endpointForm: FormGroup;
  updateForm: FormGroup;
  submitted = false;
  currentSystem: any;
  currentSystemId: any;
  data: Endpoint;
  states: State;
  systems: System;
  endpointTypes: EndpointType;
  endpoints: any;
  selectedEndpoint: Endpoint;
  @ViewChild('openBtn', { static: false }) openBtn: ElementRef;
  @ViewChild('closeUpdateModal', { static: false }) closeUpdateModal: ElementRef;
  @ViewChild('closeAddModal', { static: false }) closeAddModal: ElementRef;

  constructor(
    private fb: FormBuilder,
    private endpointService: EndpointService,
    private systemService: SystemService,
    private location: Location,
    private router: Router,
    private toastr: ToastrService ) {
    this.data = new Endpoint();
    of(this.getStates()).subscribe((data: any) => {
      this.states = data;
    });
    of(this.getSystems()).subscribe((data: any) => {
      this.systems = data;
    });
    of(this.getEndpointTypes()).subscribe((data: any) => {
      this.endpointTypes = data;
    });
    this.selectedEndpoint = new Endpoint();
    this.data = new Endpoint();
   }

   public back(): void {
    this.router.navigate(['system/endpoints']);
  }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;
    this.endpointService.getEndpoints().subscribe(
      (endpoints) => {
        this.endpoints = endpoints;
        console.log(endpoints);
    });

    this.updateForm = this.fb.group({
        EndpointName: ['', Validators.required],
        Description: ['', [Validators.required, Validators.minLength(10)]],
        Url: ['', Validators.required],
        OptimalResponseTime: ['', Validators.required],
        State: ['', Validators.required]
    });

    this.endpointForm = this.fb.group({
      EndpointName: ['', Validators.required],
      Description: ['', [Validators.required, Validators.minLength(10)]],
      URL: ['', Validators.required],
      OptimalResponseTime: ['', Validators.required],
      EndpointType: ['', Validators.required],
      State: ['', Validators.required]
    });
    // console.log(this.endpointForm);
  }

  updateEndpoint(endpoint_id: string) {
    this.endpointService.getItem(endpoint_id).subscribe(
      (res => {
        // console.log(res);
        if (res.code === '800.200.001') {
          this.selectedEndpoint = res.data.endpoint[0];
          this.openBtn.nativeElement.click();
        }
      })
    )
  }

  onSubmitAddForm() {
    this.submitted = true;
    // console.log(this.endpointForm)
    // stop here if form is invalid
    if (this.endpointForm.invalid) {
      console.log('Invalid');
      return;
    }
    
    this.data.system_id = this.currentSystemId;
    // console.log(this.data);
    this.endpointService.addEndpoints(this.data).subscribe(response => {
      if (response.code === '800.200.001') {
        this.submitted = false;
        this.closeAddModal.nativeElement.click();
        this.toastr.success('Endpoint Created successfully !');
      } else {
        console.log('error: %s, message: %s', response.code, response.message);
      }
    });
  }

  onSubmitUpdateForm() {
    // console.log(this.updateForm.controls.EndpointName.errors);
    this.submitted = true;
    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }

    this.selectedEndpoint.endpoint_id = this.selectedEndpoint.id;
    this.selectedEndpoint.state = this.selectedEndpoint.status;
    this.endpointService.updateItem( this.selectedEndpoint).subscribe(response => {
      console.log(response);
      if (response.code === '800.200.001') {
        this.submitted = false;
        this.closeUpdateModal.nativeElement.click();
        this.toastr.success('Endpoint updated successfully !');
      } else {
        console.log('message: %s, code: %s', response.message, response.code);
      }
    });
  }

  getStates() {
    this.endpointService.getStates().subscribe((data) => {
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
