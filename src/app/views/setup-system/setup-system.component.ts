import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { SetupService } from './setup.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTabChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hm-setup-system',
  templateUrl: './setup-system.component.html',
  styleUrls: ['./setup-system.component.scss']
})
export class SetupSystemComponent implements OnInit, AfterViewChecked {
  previousUrl: any;
  nextUrl: any;
  activeTab: string;
  disabledStatus: boolean;
  @ViewChild('tabs', {static: false}) tabs: NgbTabset;
  constructor(
    private setupService: SetupService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activeTab = this.activatedRoute.snapshot.firstChild.url[0].path;
    // this.setupService.previousUrl.next(null);
    // this.setupService.nextUrl.next('rules');
  }

  ngOnInit() {
    // console.log(this.activatedRoute.snapshot.firstChild.url[0].path);

    this.setupService.currentPreviousUrl.subscribe(
      (url) => this.previousUrl = url
    );
    this.setupService.currentNextUrl.subscribe(
      (url) => this.nextUrl = url
    );

    this.setupService.disabledNext.subscribe(
      (status) => {
        console.log(status);
        this.disabledStatus = status;
      }
    );
  }

  ngAfterViewChecked(): void {
    this.activatedRoute.url.subscribe((url) => {
      this.activeTab = this.activatedRoute.snapshot.firstChild.url[0].path;
      if (this.tabs) {
        this.tabs.select(this.activeTab);
      }
   });
  }

  public finish() {
    this.toastr.success('All set !');
    // window.location.reload();
  }

  onTabChange($event: NgbTabChangeEvent) {
    console.log($event.nextId);
    if (this.tabs) {
      this.activeTab = $event.nextId;
      this.router.navigate([`dashboard/quick-setup/${$event.nextId}`]);
    }
  }

}
