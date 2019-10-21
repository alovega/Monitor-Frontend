import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Endpoint } from '../endpoint';
import { EndpointService } from '../endpoint.service';
import { Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hm-endpoint-update',
  templateUrl: './endpoint-update.component.html',
  styleUrls: ['./endpoint-update.component.scss']
})
export class EndpointUpdateComponent implements OnInit {
  currentSystem: any;
  currentSystemId: any;
  id:any;
  data:Endpoint;
  updateForm:FormGroup;
  submitted:boolean = false
  constructor(
    private fb: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public endpointService: EndpointService) { 
      this.data = new Endpoint()
      this.createForm()
    }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.currentSystemId = param['system-id'];
        // console.log(this.currentSystemId);
      });
    this.id = this.activatedRoute.snapshot.params["id"];
    console.log(this.id)
    this.endpointService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response
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
  this.endpointService.updateItem(this.id, this.data).subscribe(response => {
    this.router.navigate(['endpoint']);
  })
}

}
