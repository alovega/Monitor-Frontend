import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { SystemService } from '../../shared/system.service';

@Component({
  selector: 'hm-add-system',
  templateUrl: './add-system.component.html',
  styleUrls: ['./add-system.component.scss']
})
export class AddSystemComponent implements OnInit {
  addSystemForm: FormGroup;
  currentSystemId: string;
  currentSystem: any;
  @Input() name;

  constructor(
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    let issetCurrentSystem = this.systemService.checkCurrentSystem();
    issetCurrentSystem ? this.currentSystem  = issetCurrentSystem : this.systemService.getCurrentSystem()
    .subscribe(systems => {
      this.currentSystem = systems[0];
      this.currentSystemId = this.currentSystem.id;
    });
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
