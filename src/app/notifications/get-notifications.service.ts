import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetNotificationsService {

  public email: any[] = [
    {
      name: 'This sample email',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'this sample email 2',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This sample email 3',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This sample email 4',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: ' This sample email 5',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: ' This sample email 6',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This sample email 7',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This sample email 8',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This sample email 9',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This sample email 10',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This sample email 11',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This sample email 12',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This sample email 13',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This sample email 14',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This sample email 15',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    }
  ];
  public sms: any[] = [
    {
      name: 'This is sample message 1',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This is sample message 2',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This is sample message 3',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This is sample message 4',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This is sample message 4',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This is sample message 5',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This is sample message 6',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This is sample message 7',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This is sample message 8',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This is sample message 9',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This is sample message 10',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This is sample message 11',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This is sample message 12',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This is sample message 13',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
    },
    {
      name: 'This is sample message 14',
      date_created: '2019-09-30T10:13:51 -03:00',
      status: 'sent'
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
