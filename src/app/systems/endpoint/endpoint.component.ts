import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hm-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit {
  isHidden = true;
  public systemId: string;
  public maintenanceUrl: string;
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

}
