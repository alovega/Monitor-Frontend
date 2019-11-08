import { Component, OnInit } from '@angular/core';
import { SystemStatusService } from 'src/app/shared/system-status.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hm-public-dashboard',
  templateUrl: './public-dashboard.component.html',
  styleUrls: ['./public-dashboard.component.scss']
})
export class PublicDashboardComponent implements OnInit {
  systemStatus: any;
  systemId: string;
  constructor(
    private systemStatusService: SystemStatusService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.systemId = this.activatedRoute.snapshot.paramMap.get('system-id');
    this.systemStatusService.getCurrentStatus().subscribe(
      (status) => {
        this.systemStatus = status;
        console.log(status);
      }
    );
  }

}
