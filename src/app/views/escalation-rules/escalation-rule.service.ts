import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap} from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { EscalationRuleResponse, EscalationRulesResponse, EscalationRule } from '../../shared/models/escalation-rule';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class EscalationRuleService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private httpWrapperService: HttpWrapperService
  ) { }

  createRule(escalationRule: EscalationRule): Observable<EscalationRuleResponse> {
    return this.httpWrapperService.post('create_rule/', escalationRule);
  }

  getRules(): Observable<EscalationRulesResponse> {
    return this.httpWrapperService.post('get_rules/');
  }

  getRule(ruleId: string): Observable<EscalationRuleResponse> {
    return this.httpWrapperService.post('get_rule/', {rule_id: ruleId});
  }

  updateRule(ruleId: string, body: any) {
    return this.httpWrapperService.post('update_rule/', {rule_id: ruleId, ...body});
  }

  deleteRule(ruleId: any): Observable<EscalationRuleResponse> {
    return this.httpWrapperService.post('delete_rule/', {rule_id: ruleId});
  }
}
