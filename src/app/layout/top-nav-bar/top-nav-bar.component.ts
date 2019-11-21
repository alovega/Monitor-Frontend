import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ToastrService } from 'ngx-toastr';
import { NavService } from '../../layouts/dashboard-layout/nav.service';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from '../../shared/system.service';
import { System, SystemsResponse, SystemResponse } from '../../shared/models/system';
import { AuthenticationService } from 'src/app/shared/auth/authentication.service';
import { SideNavToggleService } from 'src/app/shared/side-nav-toggle.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { ProfileService } from 'src/app/profile/profile.service';
import Swal from 'sweetalert2';

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
  systems: any;
  currentSystem: any;
  validatingForm: FormGroup;
  addSystemForm: FormGroup;
  newSystem: System;
  submitted = false;
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;
  showToggler = false;
  users: any;

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
    this.systemService.getSystems().subscribe(
      (res: SystemsResponse) => {
        if (res.code === '800.200.001') {
          this.systems = res.data;
        } else {
          this.toastr.error('An error occurred. Try again later', 'Error!');
        }
        // window.location.reload();
    });
    this.profileService.getLoggedInUserDetail().subscribe(
      (data) => {
          this.profile = data;
          console.log(this.profile);
        });
    this.currentSystem = this.systemService.getCurrentSystem();
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
        this.users = data;
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
    this.systemService.changesystem(systemId).subscribe(
      (res: SystemResponse) => {
        if (res.code === '800.200.001') {
          this.currentSystem = res.data;
          localStorage.setItem('currentSystem', JSON.stringify(this.currentSystem)),
          this.systemService.currentSystemSubject.next(this.currentSystem);
          window.location.reload();
        }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addSystemForm.invalid) {
      return;
    }

    this.systemService.createSystem(this.addSystemForm.value).subscribe(
      (res: SystemResponse) => {
        console.log(res);
        this.submitted = false;
        if (res.code === '800.200.001') {
          this.closeBtn.nativeElement.click();
          Swal.fire(
            '',
            'System created successfully!',
            'success'
          ).then(() => {
            this.systemService.changesystem(res.data.id).subscribe(
              (response: SystemResponse) => {
                if (response.code === '800.200.001') {
                  this.currentSystem = res.data;
                  localStorage.setItem('currentSystem', JSON.stringify(this.currentSystem)),
                  this.systemService.currentSystemSubject.next(this.currentSystem);
                  if (this.currentSystem) {
                    this.router.navigate(['dashboard', 'quick-setup']).then(
                      () => window.location.reload()
                    );
                  }
                } else {
                  this.toastr.error('Unexpected Error. Please try again later', 'Error');
                }
            });
          });
          // this.toastr.success('System creation success !', 'System created successfully');
        } else {
          this.toastr.error('System could not be created', 'System creation error !');
        }
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth', 'login']);
  }

}
