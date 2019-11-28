import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { System, SystemResponse } from '../../shared/models/system';
import Swal from 'sweetalert2';

import { SystemService } from '../../shared/system.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hm-edit-system',
  templateUrl: './edit-system.component.html',
  styleUrls: ['./edit-system.component.scss']
})
export class EditSystemComponent implements OnInit {
  editSystemForm: FormGroup;
  currentSystemId: any;
  currentSystem: any;
  @Input() name;
  states: any;
  system: System;
  submitted = false;
  users: any;

  constructor(
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private lookupService: LookUpService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    // this.system = new System();
    this.system = this.currentSystem;
    this.editSystemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      admin: ['', Validators.required],
      version: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;

    this.lookupService.getStates().subscribe(
      (data) => {
        this.states = data;
      });

    this.lookupService.getUsers().subscribe(
      (data) => {
        this.users = data;
    });

    this.editSystemForm.patchValue({
      name: this.currentSystem.name,
      description: this.currentSystem.description,
      admin: this.currentSystem.admin_id,
      version: this.currentSystem.version
    });
  }

  onSubmit() {
    console.log(this.editSystemForm.value);
    this.submitted = true;
    if (this.editSystemForm.invalid) {
      console.log('Invalid');
      return;
    }

    return this.systemService.updateSystem(this.currentSystem.id, this.editSystemForm.value).subscribe(
      ((response: SystemResponse) => {
        if (response.code === '800.200.001') {
          this.currentSystem = response.data;
          localStorage.setItem('currentSystem', JSON.stringify(this.currentSystem));
          this.systemService.currentSystemSubject.next(this.currentSystem);
          Swal.fire({
            title: 'Success',
            text: 'System updated successfully!',
            type: 'success',
          }).then(() => {
            window.location.reload();
          });
        } else {
          this.toastr.error(response.message, 'System could not be updated!');
        }
      })
    );
  }

  public back(): void {
    this.router.navigate(['dashboard']);
  }

}
