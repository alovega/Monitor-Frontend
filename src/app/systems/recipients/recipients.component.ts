import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss']
})
export class RecipientsComponent implements OnInit {
  isHidden = true;
  public systemId: string;
  public incidentType: string;
  public maintenanceUrl: string;
  search: string = '';
  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  }
  }
