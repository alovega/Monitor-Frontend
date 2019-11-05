import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Endpoint } from '../endpoint';
import { of } from 'rxjs';
import { EndpointService } from '../endpoint.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { State } from 'src/app/shared/models/state';
import { EndpointType } from 'src/app/shared/models/endpoint-type';
import { SystemService } from 'src/app/shared/system.service';
import { LookUpService } from 'src/app/shared/look-up.service';

@Component({
  selector: 'hm-endpoint-update',
  templateUrl: './endpoint-update.component.html',
  styleUrls: ['./endpoint-update.component.scss']
})
export class EndpointUpdateComponent implements OnInit {
  currentSystem: any;
  endpointId: any;
  endpoint: Endpoint;
  updateForm: FormGroup;
  submitted = false;
  states: State;
  endpointType: EndpointType;
  @ViewChild('closeUpdateModal', { static: false }) closeUpdateModal: ElementRef;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private systemService: SystemService,
    public endpointService: EndpointService,
    private location: Location,
    private lookupService: LookUpService) {
      this.endpoint = new Endpoint();
    }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.endpointId = this.activatedRoute.snapshot.params.id;
    this.endpointService.getItem(this.endpointId).subscribe(response => {
      if (response.code === '800.200.001') {
        this.endpoint = response.data;
        console.log(this.endpoint);
        console.log('successfully fetched endpoint %s', response.code);
      } else {
        console.log('error %s, message: %s', response.code, response.message);
      }
    });
    this.createForm();
    this.getStates();
  }
  createForm() {
    this.updateForm = this.fb.group({
        EndpointName: ['', Validators.required],
        Description: ['', [Validators.required, Validators.minLength(10)]],
        Url: ['', Validators.required],
        OptimalResponseTime: ['', Validators.required],
        State: ['', Validators.required]
    });
  }
  get f() { return this.updateForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
        return;
    }
}
public back(): void {
  this.router.navigate(['system/endpoints']);
}
onReset() {
    this.submitted = false;
    this.updateForm.reset();
}
update() {
  this.endpoint.endpoint_id = this.endpoint.id;
  this.endpoint.response_time = this.endpoint.optimal_response_time;
  this.endpoint.state = this.endpoint.state__name;
  console.log(this.endpoint);
  this.endpointService.updateItem(this.endpoint).subscribe(response => {
    if (response.code === '800.200.001') {
      console.log('message: %s, code: %s', response.message, response.code);
      this.location.back();
    } else {
      console.log('message: %s, code: %s', response.message, response.code);
    }
  });
}

getStates() {
  this.lookupService.getEndpointStates().subscribe((data) => {
    this.states = data;
  });
  }
}
