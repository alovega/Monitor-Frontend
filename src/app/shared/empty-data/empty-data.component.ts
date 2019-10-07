import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hm-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss']
})
export class EmptyDataComponent implements OnInit {
  @Input() header: string;
  @Input() description: string;
  constructor() { }

  ngOnInit() {
  }

}
