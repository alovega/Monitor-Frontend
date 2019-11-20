import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from '../../../shared/system.service';
import { System } from '../../../shared/models/system';
import { AuthenticationService } from 'src/app/shared/auth/authentication.service';
import { SideNavToggleService } from 'src/app/shared/side-nav-toggle.service';
import { LookUpService } from 'src/app/shared/look-up.service';
import { ProfileService } from 'src/app/profile/profile.service';

@Component({
  selector: 'hm-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnChanges {
  @Input() user;
  currentUser: any;
  profile: any;
  systems: System[];
  currentSystem: System;
  validatingForm: FormGroup;
  addSystemForm: FormGroup;
  newSystem: System;
  submitted = false;
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;
  showToggler = false;
  users: any;

  constructor(
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
    // this.newSystem = new System('', '', '', '', '', '', '', '', '');
  }

  ngOnInit() {
    this.systemService.getSystems().subscribe(
      (data: any[]) => {
        this.systems = data.map(item => this.systemService.adapt(item));
        // console.log(this.systems);
    });
    this.profileService.getLoggedInUserDetail().subscribe(
      (data) => {
        this.profile = data;
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
    this.systemService.changesystem(systemId).subscribe(
      () => {
        this.currentSystem = this.systemService.getCurrentSystem();
        window.location.reload();
    });
  }

  toggleSideNav(): void {
    this.sideNavService.toggleSideNav();
  }

  logout() {
    this.authService.logout();
    // this.currentUser = null;
    this.router.navigate(['/auth/login']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.addSystemForm.invalid) {
      return;
    }

    this.systemService.createSystem(this.addSystemForm.value).subscribe(
      (response => {
        this.submitted = false;
        if (response) {
          this.closeBtn.nativeElement.click();
          Swal.fire(
            '',
            'System created successfully!',
            'success'
          ).then(() => {
            this.systemService.changesystem(response.id).subscribe(
              () => {
                this.currentSystem = this.systemService.getCurrentSystem();
                this.router.navigate(['dashboard/quick-setup/endpoints']);
                // window.location.reload();
            });
            // this.changeSystem(response.id);
          });
          // this.toastr.success('System creation success !', 'System created successfully');
        } else {
          this.toastr.error('System could not be created', 'System creation error !');
        }
      })
    );
  }
}
