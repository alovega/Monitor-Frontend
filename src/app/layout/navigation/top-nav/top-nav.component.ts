import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from '../../../shared/system.service';
import { System } from '../../../shared/models/system';
import { AuthenticationService } from 'src/app/shared/auth/authentication.service';
import { SideNavToggleService } from 'src/app/shared/side-nav-toggle.service';
import { LookUpService } from 'src/app/shared/look-up.service';

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
    public breakpointObserver: BreakpointObserver,
    public sideNavService: SideNavToggleService,
    private lookupService: LookUpService
  ) {
    this.newSystem = new System();
  }

  ngOnInit() {
    this.systemService.getSystems().subscribe(
      (result => {
        this.systems = result;
        console.log(this.systems);
    }));
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
        // console.log('Current system from subject is');
        this.currentSystem = this.systemService.getCurrentSystem();
    });
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
        console.log(response);
        if (response) {
          console.log(response.id);
          this.changeSystem(response.id);
          this.closeBtn.nativeElement.click();
          this.router.navigate(['']);
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
