import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { EscalationRule } from './escalation-rule';

@Injectable({
  providedIn: 'root'
})
export class EscalationRuleService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  deleteRuleUrl = 'http://127.0.0.1:8000/api/get_rules/';

  constructor(
    private http: HttpClient
  ) { }

  createRule(formData: any): Observable<EscalationRule[]> {
    const getRulesUrl = 'http://127.0.0.1:8000/api/create_rule/';
    return this.http.post<EscalationRule[]>(getRulesUrl, formData, this.httpOptions).pipe(

    );
  }

  getRules(): Observable<EscalationRule[]> {
    const getRulesUrl = 'http://127.0.0.1:8000/api/get_rules/';
    return this.http.post<EscalationRule[]>(getRulesUrl, this.httpOptions).pipe(

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
