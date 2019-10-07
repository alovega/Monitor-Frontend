import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  elements: any = [
    {username: 'Victor', date_created: '10/07/2019', email: 'victornjoseph@gmail.com'},
    {username: 'Victor', date_created: '10/07/2019', email: 'victornjoseph@gmail.com'},
    {username: 'Victor', date_created: '10/07/2019', email: 'victornjoseph@gmail.com'}
  ];

  headElements = ['Username', 'Date Created', 'Email', 'Action'];

  constructor() { }

  ngOnInit() {
  }

}
