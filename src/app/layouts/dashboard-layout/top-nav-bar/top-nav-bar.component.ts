import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ToastrService } from 'ngx-toastr';
import { NavService } from '../nav.service';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from '../../../shared/system.service';
import { System } from '../../../shared/models/system';
import { AuthenticationService } from 'src/app/shared/auth/authentication.service';
import { SideNavToggleService } from 'src/app/shared/side-nav-toggle.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { ProfileService } from 'src/app/profile/profile.service';

@Component({
  selector: 'hm-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit, OnChanges {
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
      this.newSystem = new System();
    }

  ngOnInit() {
    this.systemService.getSystems().subscribe(
      (result => {
        this.systems = result;
        console.log(this.systems);
    }));
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

    this.addSystemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      admin: ['', Validators.required]
    });

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
  changeSystem(systemId: any) {
    // this.toastr.success('Success loaded top nav!');

    this.systemService.changesystem(systemId).subscribe(
      () => {
        this.currentSystem = this.systemService.getCurrentSystem();
        window.location.reload();
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addSystemForm.invalid) {
      console.log('Invalid');
      return;
    }

    this.systemService.createSystem(this.newSystem).subscribe(
      (response => {
        this.submitted = false;
        if (response) {
          this.changeSystem(response.id);
          this.closeBtn.nativeElement.click();
          this.toastr.success('System creation success !', 'System created successfully');
          this.router.navigate(['dashboard/quick-setup/endpoints']);
        } else {
          this.toastr.success('System creation error !', 'System could not be created');
        }
      })
    );
    console.log(this.newSystem);
  }

  logout() {
    this.authService.logout();
    // this.currentUser = null;
    this.router.navigate(['/auth/login']);
  }

}
