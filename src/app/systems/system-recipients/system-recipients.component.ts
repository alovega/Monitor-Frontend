import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hm-recipients',
  templateUrl: './system-recipients.component.html',
  styleUrls: ['./system-recipients.component.scss']
})
export class SystemRecipientsComponent implements OnInit {
  isHidden = true;
  public systemId: string;
  public incidentType: string;
  public maintenanceUrl: string;
  search = '';
  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  }
  }
