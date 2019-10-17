import { TestBed } from '@angular/core/testing';

import { EscalationRuleService } from './escalation-rule.service';

describe('EscalationRuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EscalationRuleService = TestBed.get(EscalationRuleService);
    expect(service).toBeTruthy();
  });
});
