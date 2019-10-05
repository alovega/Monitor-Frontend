import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-endpoint-view',
  templateUrl: './endpoint-view.component.html',
  styleUrls: ['./endpoint-view.component.scss']
})
export class EndpointViewComponent implements OnInit {

  elements: any = [
    {id: 'endpoint 1', first: 'Mark', last: 'Otto'},
    {id: 'endpoint 2', first: 'Jacob', last: 'Thornton'},
    {id: 'endpoint 3', first: 'Larry', last: 'the Bird'},
  ];

  headElements = ['Endpoint', 'Date Created', 'Action'];

  constructor() { }

  ngOnInit() {
  }

}
