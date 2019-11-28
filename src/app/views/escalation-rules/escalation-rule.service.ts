import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { HttpWrapperService } from 'src/app/shared/helpers/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class EscalationRuleService {
  constructor(
    private httpWrapperService: HttpWrapperService
  ) { }

  createRule<T>(escalationRule: any): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('create_rule/', escalationRule);
  }

  getRules<T>(): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('get_rules/');
  }

  getRule<T>(ruleId: string): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('get_rule/', {rule_id: ruleId});
  }

  updateRule<T>(ruleId: string, body: any): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('update_rule/', {rule_id: ruleId, ...body});
  }

  deleteRule<T>(ruleId: any): Observable<HttpResponse<T>> {
    return this.httpWrapperService.post<T>('delete_rule/', {rule_id: ruleId});
  }
}
