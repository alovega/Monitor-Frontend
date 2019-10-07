import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetRecipientsService {

  public email: any[] = [
    {
      name: 'email 1',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'email 2',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'email 3',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'email 4',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'email 5',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'email 6',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'email 7',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'email 8',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'email 9',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'email 10',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'email 11',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'email 12',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'email 13',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'email 14',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: 'email 15',
      date_created: '2019-09-30T10:13:51 -03:00'
    }
  ];
  public sms: any[] = [
    {
      name: '+254773xxxxxx',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: '+254722xxxxxx',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: '+254711xxxxxx',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: '+254733xxxxxx',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: '+254773xxxxxx',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: '+254724xxxxxx',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: '+254713xxxxxx',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: '+254773xxxxxx',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: '+254773xxxxxx',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: '+254773xxxxxx',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: '+254773xxxxxx',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: '+254773xxxxxx',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: '+254773xxxxxx',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: '+254773xxxxxx',
      date_created: '2019-09-30T10:13:51 -03:00'
    },
    {
      name: '+254773xxxxxx',
      date_created: '2019-09-30T10:13:51 -03:00'
    }
  ];
  constructor() { }

  getEmail() {
    return this.email;
  }

  getSms(){
    return this.sms
  }
}

