import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap} from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { EscalationRule } from './escalation-rule';

@Injectable({
  providedIn: 'root'
})
export class EscalationRuleService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  deleteRuleUrl = 'http://127.0.0.1:8000/api/get_rules/';

  public test: any[] = [];
  public rules: any[] = [
    {
      order_number: 1,
      purchased_on: '2019-09-30T10:13:51 -03:00',
      bill_to_name: 'Avila',
      ship_to_name: 'Annie Burns',
      status: true
    },
    {
      order_number: 2,
      purchased_on: '2019-10-18T09:21:20 -03:00',
      bill_to_name: 'Callie',
      ship_to_name: 'Burt Francis',
      status: false
    },
    {
      order_number: 3,
      purchased_on: '2019-10-04T11:33:19 -03:00',
      bill_to_name: 'Cathy',
      ship_to_name: 'Alisa Goff',
      status: true
    },
    {
      order_number: 4,
      purchased_on: '2019-10-08T03:32:22 -03:00',
      bill_to_name: 'Fisher',
      ship_to_name: 'Erika Melton',
      status: true
    },
    {
      order_number: 5,
      purchased_on: '2019-10-04T09:18:17 -03:00',
      bill_to_name: 'Moody',
      ship_to_name: 'Cynthia Woodard',
      status: false
    },
    {
      order_number: 6,
      purchased_on: '2019-10-08T05:31:55 -03:00',
      bill_to_name: 'Norman',
      ship_to_name: 'Lelia Osborne',
      status: false
    },
    {
      order_number: 7,
      purchased_on: '2019-10-05T01:41:35 -03:00',
      bill_to_name: 'Jolene',
      ship_to_name: 'Ebony Cook',
      status: false
    },
    {
      order_number: 8,
      purchased_on: '2019-10-05T11:20:56 -03:00',
      bill_to_name: 'Haynes',
      ship_to_name: 'Daniels Rosales',
      status: false
    },
    {
      order_number: 9,
      purchased_on: '2019-10-12T03:42:05 -03:00',
      bill_to_name: 'Betty',
      ship_to_name: 'Dawn Padilla',
      status: true
    },
    {
      order_number: 10,
      purchased_on: '2019-10-06T09:38:52 -03:00',
      bill_to_name: 'Jean',
      ship_to_name: 'Best Higgins',
      status: true
    },
    {
      order_number: 11,
      purchased_on: '2019-10-02T12:19:35 -03:00',
      bill_to_name: 'Shelly',
      ship_to_name: 'Marguerite Bass',
      status: false
    },
    {
      order_number: 12,
      purchased_on: '2019-10-09T06:42:15 -03:00',
      bill_to_name: 'Judy',
      ship_to_name: 'Austin Crane',
      status: false
    },
    {
      order_number: 13,
      purchased_on: '2019-10-19T09:27:51 -03:00',
      bill_to_name: 'Kristin',
      ship_to_name: 'Lula Graham',
      status: false
    },
    {
      order_number: 14,
      purchased_on: '2019-10-04T07:40:41 -03:00',
      bill_to_name: 'Shields',
      ship_to_name: 'Gibson Sloan',
      status: true
    },
    {
      order_number: 15,
      purchased_on: '2019-09-30T07:15:24 -03:00',
      bill_to_name: 'Leona',
      ship_to_name: 'Marietta Sanford',
      status: true
    }
  ];

  constructor(
    private http: HttpClient
  ) { }

  createRule(formData: any): Observable<EscalationRule[]> {
    const getRulesUrl = 'http://127.0.0.1:8000/api/create_rule/';
    return this.http.post<EscalationRule[]>(getRulesUrl, formData, this.httpOptions).pipe(

    );
  }

  getRules(): Observable<any> {
    const getRulesUrl = environment.apiEndpoint + 'get_rules/';
    return this.http.post<any>(getRulesUrl, {
      token: 'MjM0Njg4YmVkYzRiMTA0MDU3Mjc3M2Y0MmNjMTg0'
    }).pipe(
      map(rule => rule.data)
    );
  }

  getRule() {
    const getRuleUrl = 'http://127.0.0.1:8000/api/get_rule/';
    return this.http.post<EscalationRule[]>(getRuleUrl, this.httpOptions).pipe(
    );
  }

  updateRule(formData: any) {
    const updateRuleUrl = 'http://127.0.0.1:8000/api/update_rule/';
    return this.http.post<EscalationRule[]>(updateRuleUrl, formData, this.httpOptions).pipe(

    );
  }

  deleteRule(ruleId: string) {
    const deleteRuleUrl = 'http://127.0.0.1:8000/api/delete_rule/';
    return this.http.post<EscalationRule[]>(deleteRuleUrl, {
      rule_id: ruleId
    }, this.httpOptions).pipe(

    );
  }
}
