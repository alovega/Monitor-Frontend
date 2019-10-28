import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSystemComponent } from '../../../shared/add-system/add-system.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from '../../../shared/system.service';
import { System } from '../../../shared/models/system';
import { AuthenticationService } from 'src/app/shared/auth/authentication.service';
import { SideNavToggleService } from 'src/app/shared/side-nav-toggle.service';

@Component({
  selector: 'hm-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnChanges {
  @Input() user;
  currentUser: any;
  systems: any;
  currentSystem: any;
  currentSystemId: any;
  systemIsAvailable: boolean = false;
  validatingForm: FormGroup;
  addSystemForm: FormGroup;
  newSystem: System;
  submitted = false;
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;
  showToggler = false;

  constructor(
    private systemService: SystemService,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    public breakpointObserver: BreakpointObserver,
    public sideNavService: SideNavToggleService
  ) {
    this.newSystem = new System();
  }

  ngOnInit() {
    this.systemService.getSystems().subscribe(
      (result => {
        this.systems = result;
      })
    );

    this.breakpointObserver.observe(['(max-width: 1199.98px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.showToggler = true;
      } else {
        this.showToggler = false;
      }
    });
    const issetCurrentSystem = this.systemService.checkCurrentSystem();
    issetCurrentSystem ? this.currentSystem  = issetCurrentSystem : this.systemService.getCurrentSystem()
    .subscribe(systems => {
      this.currentSystem = systems[0];
      this.currentSystemId = this.currentSystem.id;
    });
    this.systemIsAvailable = true;

    this.addSystemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user.currentValue) {
      this.currentUser = this.user;
    }
  }

  reload(systemId: any) {
    this.systemService.setSystem(systemId).subscribe(
      (result => {
        this.currentSystem = result[0];
      })
    );
  }

  toggleSideNav(): void {
    this.sideNavService.toggleSideNav();
  }

  onSubmit() {
    this.submitted = true;
    if (this.addSystemForm.invalid) {
      console.log('Invalid');
      return;
    }

    this.systemService.createSystem(this.newSystem).subscribe(
      (response => {
        if (response.code === '800.200.001') {
          console.log(response.data.id);
          this.systemService.setSystem(response.data.id).subscribe(
            (newSystem => {
              this.newSystem = newSystem[0];
              this.reload(this.newSystem.id);
              this.closeBtn.nativeElement.click();
              this.router.navigate(['']);
            }));
        }
      })
    );
    console.log(this.newSystem);
  }

  logout() {
    this.authService.logout();
    // this.currentUser = null;
    this.router.navigate(['/login']);
  }

}
