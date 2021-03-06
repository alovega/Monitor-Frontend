import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Endpoint, EndpointData } from '../model/endpoint';
import { of, forkJoin } from 'rxjs';
import { EndpointService } from '../endpoint.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/shared/models/state';
import { EndpointType } from 'src/app/shared/models/endpoint-type';
import { ToastrService } from 'ngx-toastr';
import { LookUpService } from 'src/app/shared/look-up.service';
import { LookUpResponse } from 'src/app/shared/models/look-up-response';
import { EndpointResponse } from '../model/endpoint-response';

@Component({
  selector: 'hm-endpoint-update',
  templateUrl: './endpoint-update.component.html',
  styleUrls: ['./endpoint-update.component.scss']
})
export class EndpointUpdateComponent implements OnInit {
  endpointId: any;
  data: any;
  color: string;
  endpoint: any;
  updateForm: FormGroup;
  position = 'bottom';
  submitted = false;
  States: State[];
  endpointType: EndpointType;
  stateId: string;
  isdataReady = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public endpointService: EndpointService,
    private location: Location,
    private lookupService: LookUpService,
    private toastr: ToastrService) {
      this.data = new Endpoint();
      this.createForm();
      // of(this.getStates()).subscribe((data: any) => {
      //   this.States = data;
      // });
    }

  ngOnInit() {
    this.endpointId = this.activatedRoute.snapshot.params.id;
    const states = this.lookupService.getLookUpData<LookUpResponse>();
    this.endpointService.getItem<EndpointData>(this.endpointId).subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.data = response.body.data;
          forkJoin(states)
          .subscribe(results => {
            console.log(results);
            if (results[0]) {
              this.States = results[0].body.data.states.map((state: State) => ({id: state.id, text: state.name}));
              this.stateId = this.States.filter(i => i.id === this.data.state)[0].id;
            }
            this.isdataReady = true;
          });
          this.color = this.data.color;
          this.updateForm.patchValue({
                EndpointName: this.data.name,
                Description: this.data.description,
                Url: this.data.url,
                Color: this.data.color,
                OptimalResponseTime: this.data.optimal_response_time,
                State: this.data.state
              });
        } else {
          this.toastr.error(response.body.message);
        }
      }
    });
}
  createForm() {
    const urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.updateForm = this.fb.group({
        EndpointName: ['', Validators.required],
        Description: ['', [Validators.required, Validators.minLength(10)]],
        Url: ['', [Validators.required, Validators.pattern(urlRegex)]],
        OptimalResponseTime: ['', Validators.required],
        Color: ['', Validators.required],
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
  this.router.navigate(['dashboard', 'endpoints']);
}
onReset() {
    this.submitted = false;
    this.updateForm.reset();
}
update() {
  console.log(this.updateForm.value);
  this.data = this.updateForm.value;
  this.data.endpoint_id = this.endpointId;
  this.endpointService.updateItem<EndpointResponse>(this.data).subscribe(response => {
    if (response.ok) {
      if (response.body.code === '800.200.001') {
        this.toastr.success(response.body.message);
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
        this.States = response.body.data.endpoint_states.filter(state => state.name === 'Operational');
      } else {
        this.toastr.error(response.body.code, 'Error while retrieving endpoint states');
      }
    }
  });
}
updateColor(event) {
  console.log(event); // this is your selected color
}
}

