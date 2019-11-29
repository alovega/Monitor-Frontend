import { Component, OnInit, AfterViewChecked, ViewChild, ChangeDetectorRef } from '@angular/core';
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
    private activatedRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    this.activeTab = this.activatedRoute.snapshot.firstChild.url[0].path;
  }

  ngOnInit() {
    this.setupService.currentPreviousUrl.subscribe(
      (url) => this.previousUrl = url
    );
    this.setupService.currentNextUrl.subscribe(
      (url) => this.nextUrl = url
    );

    this.setupService.disabledNext.subscribe(
      (status) => {
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
    this.changeDetector.detectChanges();
  }

  public finish() {
    this.toastr.success('All set !');
    // window.location.reload();
  }

  onTabChange($event: NgbTabChangeEvent) {
    if (this.tabs) {
      this.activeTab = $event.nextId;
      this.router.navigate([`dashboard/quick-setup/${$event.nextId}`]);
    }
  }
}
