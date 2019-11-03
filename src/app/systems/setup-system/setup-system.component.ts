import { Component, OnInit } from '@angular/core';
import { SetupService } from './setup.service';

@Component({
  selector: 'hm-setup-system',
  templateUrl: './setup-system.component.html',
  styleUrls: ['./setup-system.component.scss']
})
export class SetupSystemComponent implements OnInit {
  previousUrl: any;
  nextUrl: any;
  constructor(
    private setupService: SetupService
  ) {
    // this.setupService.previousUrl.next(null);
    // this.setupService.nextUrl.next('rules');
  }

  ngOnInit() {
    this.previousUrl = this.setupService.currentPreviousUrl.subscribe(
      (url) => this.previousUrl = url
    );
    this.nextUrl = this.setupService.currentNextUrl.subscribe(
      (url) => this.nextUrl = url
    );
  }

}
