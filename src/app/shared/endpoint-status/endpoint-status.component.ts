import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hm-endpoint-status',
  templateUrl: './endpoint-status.component.html',
  styleUrls: ['./endpoint-status.component.scss']
})
export class EndpointStatusComponent implements OnInit {
  @Input() status: string;
  constructor() {
  }

  ngOnInit() {

  }

}
