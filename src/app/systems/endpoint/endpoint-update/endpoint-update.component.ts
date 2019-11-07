import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Endpoint } from '../endpoint';
import { of } from 'rxjs';
import { EndpointService } from '../endpoint.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/shared/models/state';
import { EndpointType } from 'src/app/shared/models/endpoint-type';
import { SystemService } from 'src/app/shared/system.service';
import { ToastrService } from 'ngx-toastr';
import { LookUpService } from 'src/app/shared/look-up.service';

@Component({
  selector: 'hm-endpoint-update',
  templateUrl: './endpoint-update.component.html',
  styleUrls: ['./endpoint-update.component.scss']
})
export class EndpointUpdateComponent implements OnInit {
  currentSystem: any;
  currentSystemId: any;
  endpointId: any;
  data: any;
  updateForm: FormGroup;
  submitted = false;
  States: State;
  endpointType: EndpointType;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private systemService: SystemService,
    public endpointService: EndpointService,
    private location: Location,
    private lookupService: LookUpService,
    private toastr: ToastrService) {
      this.data = new Endpoint();
      this.createForm();
      of(this.getStates()).subscribe((data: any) => {
        this.States = data;
      });
    }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;
    this.endpointId = this.activatedRoute.snapshot.params.id;
    console.log(this.endpointId);
    this.endpointService.getItem(this.endpointId).subscribe(response => {
      if (response.code === '800.200.001') {
        this.data = response.data;
        console.log(this.data);
        this.toastr.success('successfully fetched endpoint', response.code);
      } else {
        console.log('error %s, message: %s', response.code, response.message);
      }
  });
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
  this.data.endpoint_id = this.endpointId;
  this.endpointService.updateItem(this.data).subscribe(response => {
    if (response.code === '800.200.001') {
      this.toastr.success(response.message, response.code);
      this.location.back();
    } else {
      this.toastr.error(response.message, response.code);
    }
  });
}
getStates() {
  this.lookupService.getEndpointStates().subscribe((data) => {
    this.States = data;
  });
}
}
