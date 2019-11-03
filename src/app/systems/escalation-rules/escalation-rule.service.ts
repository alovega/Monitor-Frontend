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

  constructor(
    private http: HttpClient
  ) { }

  createRule(escalationRule: any): Observable<any> {
    const createRulesUrl = environment.apiEndpoint + 'create_rule/';
    return this.http.post<any>(createRulesUrl, escalationRule).pipe(
      tap(response => console.log(response))
    );
  }

  getRules(): Observable<any> {
    const getRulesUrl = environment.apiEndpoint + 'get_rules/';
    return this.http.post<any>(getRulesUrl, {}).pipe(
      map(rule => rule.data),
    );
  }

  getRule(ruleId: string) {
    const getRuleUrl = environment.apiEndpoint + 'get_rule/';
    return this.http.post<any>(getRuleUrl, {
      rule_id: ruleId
    }).pipe(
      tap(rule => console.log(rule)),
      map(rule => rule.data),
    );
  }

  updateRule(escalationRule: any) {
    const updateRuleUrl = environment.apiEndpoint + 'update_rule/';
    return this.http.post<any>(updateRuleUrl, escalationRule).pipe(
      tap(response => console.log(response))
    );
  }

  deleteRule(escalationRuleId: any) {
    const deleteRuleUrl = environment.apiEndpoint + 'delete_rule/';
    return this.http.post<any>(deleteRuleUrl, {rule_id: escalationRuleId}).pipe(
      tap(response => console.log(response))
    );
  }
}
