import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ToastrService } from 'ngx-toastr';
import * as jquery from 'jquery';

import { NavService } from '../../layouts/dashboard-layout/nav.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from '../../shared/system.service';
import { System, SystemsResponse, SystemResponse } from '../../shared/models/system';
import { AuthenticationService } from 'src/app/shared/auth/authentication.service';
import { SideNavToggleService } from 'src/app/shared/side-nav-toggle.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { ProfileService } from 'src/app/profile/profile.service';
import Swal from 'sweetalert2';
import { DropdownItem } from './dropdown-item';

@Component({
  selector: 'hm-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit, OnChanges {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Input() user;
  currentUser: any;
  profile: any;
  systems: System[];
  currentSystem: any;
  currentSystemId: string;
  validatingForm: FormGroup;
  addSystemForm: FormGroup;
  newSystem: System;
  submitted = false;
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;
  showToggler = false;
  users: any[];
  systemsDropDown: any[];
  dropDownData: any[];

  constructor(
    public navService: NavService,
    private systemService: SystemService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private profileService: ProfileService,
    public breakpointObserver: BreakpointObserver,
    public sideNavService: SideNavToggleService,
    private lookupService: LookUpService,
    private toastr: ToastrService
    ) {
      this.addSystemForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        admin: ['', Validators.required]
      });
    }

  ngOnInit() {
    this.systemService.getSystems<SystemsResponse>()
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.systems = response.body.data;
          this.systemsDropDown = this.systems.map((sys) => ({id: sys.id, text: sys.name}));
        } else {
          this.toastr.error('An error occurred. Try again later', 'Error!');
        }
      } else {
        // TODO: Add error checks
      }
    });
    this.profileService.getLoggedInUserDetail().subscribe(
      (data) => {
          this.profile = data;
      });
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId  = this.currentSystem ? this.currentSystem.id : null;
    this.authService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
    });
    this.breakpointObserver.observe(['(max-width: 1199.98px)']).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.showToggler = true;
      } else {
        this.showToggler = false;
        this.sideNavService.toggleSideNav(true);
    }});

    this.lookupService.getUsers().subscribe(
      (data) => {
        this.users = data.map((user) => ({id: user.id, text: user.username}));
      });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.user.currentValue) {
      this.currentUser = this.user;
    }
  }
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }
  changeSystem(systemId: any) {
    this.systemService.getSystem<SystemResponse>(systemId)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.currentSystem = response.body.data;
          localStorage.setItem('currentSystem', JSON.stringify(this.currentSystem)),
          this.systemService.currentSystemSubject.next(this.currentSystem);
          window.location.reload();
        } else {
          this.toastr.error('Cannot switch systems at the moment. Try again later', 'System Switch Error');
        }
      } else {
        // TODO: Add error checks
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addSystemForm.invalid) {
      return;
    }

    this.systemService.createSystem<SystemResponse>(this.addSystemForm.value)
    .subscribe(response => {
      if (response.ok) {
        this.submitted = false;
        if (response.body.code === '800.200.001') {
          this.closeBtn.nativeElement.click();
          this.currentSystem = response.body.data;
          localStorage.setItem('currentSystem', JSON.stringify(this.currentSystem)),
          this.systemService.currentSystemSubject.next(this.currentSystem);
          Swal.fire(
            '',
            'System created successfully!',
            'success'
          ).then(() => {
            this.router.navigate(['dashboard', 'quick-setup']).then(
              () => window.location.reload()
            );
          });
          // this.toastr.success('System creation success !', 'System created successfully');
        } else {
          this.toastr.error(response.body.message, 'System creation error !');
        }
      } else {
        // TODO: Add error check
      }
    });
  }

  public changed(nextSystem: any, previousSystem: string): void {
    Swal.fire('', 'Click OK to confirm system switch', 'warning').then(
      (confirm) => {
        if (confirm.value) {
          this.systemService.getSystem<SystemResponse>(nextSystem)
          .subscribe(response => {
            if (response.ok) {
              if (response.body.code === '800.200.001') {
                this.currentSystem = response.body.data;
                localStorage.setItem('currentSystem', JSON.stringify(this.currentSystem)),
                this.systemService.currentSystemSubject.next(this.currentSystem);
                window.location.reload();
              } else {
                this.currentSystemId = previousSystem;
                this.toastr.error('Cannot change system at the moment. Try again later', 'System Switch Error');
              }
            } else {
              // TODO: Add error checks
            }
          });
        } else {
          this.currentSystemId = previousSystem;
          this.toastr.info('System switch cancelled', '');
        }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth', 'login']);
  }

}
