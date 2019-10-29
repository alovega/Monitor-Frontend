import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { System } from '../../shared/models/system';
import Swal from 'sweetalert2';

import { SystemService } from '../../shared/system.service';
import { LookUpService } from 'src/app/shared/look-up.service';

@Component({
  selector: 'hm-add-system',
  templateUrl: './add-system.component.html',
  styleUrls: ['./add-system.component.scss']
})
export class AddSystemComponent implements OnInit {
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
    private router: Router
  ) {
    // this.system = new System();
   }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.system = this.currentSystem;
    this.currentSystemId = this.currentSystem.id;

    this.editSystemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      admin: [''],
      version: ['']
    });

    this.lookupService.getStates().subscribe(
      (data) => {
        this.states = data;
      });

    this.lookupService.getUsers().subscribe(
      (data) => {
        this.users = data;
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editSystemForm.invalid) {
      console.log('Invalid');
      return;
    }

    return this.systemService.updateSystem(this.system).subscribe(
      ((result: any) => {
        if (result.code === '800.200.001') {
          Swal.fire({
            title: 'Success',
            text: 'System updated successfully!',
            type: 'success',
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'System could not be updated!',
            type: 'error',
          }).then(() => {
            window.location.reload();
          });
        }
      })
    );
  }

  public back(): void {
    this.router.navigate([`system/dashboard`]);
  }

}
