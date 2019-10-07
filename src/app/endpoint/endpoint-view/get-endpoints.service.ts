import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetEndpointsService {
  public endpoints: any[] = [
    {
      name: 'endpoint 1',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'endpoint 2',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'endpoint 3',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'endpoint 4',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'endpoint 5',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'endpoint 6',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'endpoint 7',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'endpoint 8',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'endpoint 9',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'endpoint 10',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'endpoint 11',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'endpoint 12',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'endpoint 13',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'endpoint 14',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'endpoint 15',
      date_created: '2019-09-30T10:13:51 -03:00'
    }
  ];
  constructor() { }

  getEndpoint() {
    return this.endpoints;
  }
}

