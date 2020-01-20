import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { System, SystemResponse } from '../../shared/models/system';
import Swal from 'sweetalert2';

import { SystemService } from '../../shared/system.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { ToastrService } from 'ngx-toastr';
import { DropdownItem } from 'src/app/layout/top-nav-bar/dropdown-item';
import { User } from '../users/user';

@Component({
  selector: 'hm-edit-system',
  templateUrl: './edit-system.component.html',
  styleUrls: ['./edit-system.component.scss']
})
export class EditSystemComponent implements OnInit {
  editSystemForm: FormGroup;
  currentSystem: System;
  system: System;
  submitted = false;
  users: DropdownItem[];
  isDataReady = false;
  constructor(
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private lookupService: LookUpService,
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
    this.lookupService.getUsers().subscribe(
      (data) => {
        this.users = data.map((user: User) => ({id: user.id, text: user.username}));
        this.isDataReady = true;
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

    return this.systemService.updateSystem<SystemResponse>(this.currentSystem.id, this.editSystemForm.value)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.currentSystem = response.body.data;
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
          this.toastr.error(response.body.message, 'System update error!');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }

  public back(): void {
    this.router.navigate(['dashboard']);
  }

}
